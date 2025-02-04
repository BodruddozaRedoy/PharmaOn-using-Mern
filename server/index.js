const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config()
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express();
const port = process.env.PORT || 5000;
// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server running");
});

const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const categoryCollection = client.db("pharmaOnDB").collection("categories");
    const productCollection = client.db("pharmaOnDB").collection("products");
    const cartCollection = client.db("pharmaOnDB").collection("cart");
    const userCollection = client.db("pharmaOnDB").collection("users");
    const adCollection = client.db("pharmaOnDB").collection("ads");
    const paymentCollection = client.db("pharmaOnDB").collection("payments");

    //! middlewares
    const verifyToken = (req, res, next) => {
      // console.log(req.headers);
      if(!req.headers.authorization) return res.status(401).send({message: 'Forbidden access'})
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(401).send({message: 'Invalid access'})
          req.decoded = decoded
        next()
      })
    }
    const verifyAdmin = async (req, res, next) => {
      const user = req.decoded
      if(!user) return res.status(401).send({message: 'Invalid access'})
      const dbUser = await userCollection.findOne({email:user.email})
      const isAdmin = dbUser?.role === 'admin'
      if(!isAdmin) return res.status(401).send({message: 'Invalid admin'})
      next()
    }

    const verifySeller = async (req, res, next) => {
      const user = req.decoded
      if(!user) return res.status(401).send({message: 'Invalid access'})
      const dbUser = await userCollection.findOne({email:user.email})
      const isSeller = dbUser?.role === 'seller'
      if(!isSeller)  return res.status(401).send({message: 'Invalid seller'})
      next()
    }

    //! user related api
    app.post("/users", async (req, res) => {
      const user = req.body;
      const existingUser = await userCollection.findOne({ email: user.email });
      if (existingUser) return res.send("User already exists");
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    app.get("/users", verifyToken, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    app.put("/users/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const role = req.body.role;
      // console.log(role);

      const result = await userCollection.updateOne(
        { email: email },
        { $set: { role: role } }
      );
      res.send(result);
    });
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email
      const user = await userCollection.findOne({email:email})
      res.send(user)
    })
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email
      if(email !== req.decoded.email) {
        return res.status(403).send({message: "Unauthorized access"})
      }
      const query = {email:email}
      const user = await userCollection.findOne(query)
      let isAdmin = false
      if(user){
        isAdmin = user?.role === "admin"
      } 
      res.send({isAdmin})
    })
    app.get("/users/seller/:email", verifyToken, async (req, res) => {
      const email = req.params.email
      if(email !== req.decoded.email) {
        return res.status(403).send({message: "Unauthorized access"})
      }
      const query = {email:email}
      const user = await userCollection.findOne(query)
      let isSeller = false
      if(user){
        isSeller = user?.role === "seller"
      } 
      res.send({isSeller})
    })
    app.patch("/users/:email", verifyToken, async (req, res) => {
      const email = req.params.email
      const user = req.body
      const result = await userCollection.updateOne({email:email}, {
        $set: {
          displayName:user?.displayName,
          photoURL:user?.photoURL
        }
      })
      res.send(result)
    })

    app.post("/token", async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '7d'
      })
      res.send({token})

    })
    //! product related api
    app.get("/products", async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });
    app.post("/products", verifyToken, verifySeller, async (req, res) => {
      const data = req.body
      // console.log(product);
      const product = {
        userEmail: data?.userEmail,
        name:data?.name,
        genericName:data?.genericName,
        description:data?.description,
        imgUrl:data?.imgUrl,
        category:data?.category,
        company:data?.company,
        unit:data?.unit,
        unitPrice: parseFloat(data?.unitPrice),
        discountPercentage: parseFloat(data?.discountPercentage),
        imgUpload:data?.imgUpload,
        newPrice: data?.unitPrice - ((data?.discountPercentage * data?.unitPrice) / 100),
        available:parseInt(data?.available)
      }
      const result = await productCollection.insertOne(product)
      res.send(result)
    })
    //! category related api
    app.get("/categories", async (req, res) => {
      const categories = await categoryCollection.aggregate([
        {
          $lookup: {
              from: "products",
              let: { slugLower: { $toLower: "$slug" } },
              pipeline: [
                  { $match: { $expr: { $eq: [{ $toLower: "$category" }, "$$slugLower"] } } }
              ],
              as: "products",
          }
      },
        {
            $project: {
                name: 1, // Include the name field
                img: 1,  // Include the img field
                slug: 1, // Include the slug field
                productCount: { $size: "$products" }, // Add product count
            },
        },
    ]).toArray();
    
    res.send(categories);
    });
    app.get("/categories/:slug", async (req, res) => {
      const slug = req.params.slug;
      const products = await productCollection
        .find({ category: slug })
        .toArray();
      res.send(products);
    });
    app.patch("/categories/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      
      const category = req.body;
      // console.log(category);
      
      const result = await categoryCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            slug: category.slug,
            name: category.name,
            img: category.img,
          },
        }
      );
      res.send(result);
    });
    app.delete("/categories/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id
      const result = await categoryCollection.deleteOne({_id: new ObjectId(id)})
      res.send(result)
    })
    app.post("/categories", verifyToken, verifyAdmin, async (req, res) => {
      const category = req.body 
      const result = await categoryCollection.insertOne(category)
      res.send(result)
    })

    //! cart related api
    app.post("/cart", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await cartCollection.insertOne(data);
      res.send(result);
    });
    app.get("/cart/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const result = await cartCollection.find({ userEmail: email }).toArray();
      res.send(result);
    });
    app.delete("/cart/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });
    app.delete("/delete-all-cart/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const result = await cartCollection.deleteMany({ userEmail: email });
      res.send(result);
    });
    app.patch("/cart/:id", verifyToken, async (req, res) => {
      const id = req.params.id
      const {value} = req.body
      let updatedQuantity
      const cart = await cartCollection.findOne({_id: new ObjectId(id)})
      if(value === "increase"){
        updatedQuantity = cart.quantity + 1
      }else{
        updatedQuantity = cart.quantity - 1
      }
      const updatedPrice = updatedQuantity * cart.price
      // console.log(increase);
      const result = await cartCollection.updateOne({_id: new ObjectId(id)}, {$set:{quantity:updatedQuantity, totalPrice:updatedPrice}})
      res.send(result)
    })

    //! checkout related api
    app.post("/checkout", verifyToken, async (req, res) => {
      const checkout = req.body;
      // console.log(checkout);
    });

    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const {price} = req.body;
      if (!price || price <= 0) {
        return res.send({ error: "Invalid price provided" });
      }
      const amount = parseInt(price * 100)
      const paymentIntent = await stripe?.paymentIntents.create({
        amount:amount,
        currency: 'usd',
        payment_method_types:['card']
      })
      res.send({
        clientSecret: paymentIntent.client_secret
      })
    })

    app.post("/payments", verifyToken, async (req, res) => {
      const payment = req.body;
      if (!payment) return res.send({ error: "Payment is required" });
      const result = await paymentCollection.insertOne(payment)
      const query = {_id: {
        $in: payment.cartIds?.map(id => new ObjectId(id))
      }}
      const deleteResult = await cartCollection.deleteMany(query)
      res.send({result, deleteResult})
    })

    app.get("/payment/user/:email", async (req, res) => {
      const email = req.params.email
      const result = await paymentCollection.find({email:email}).toArray()
      res.send(result)
      
    })

    app.get("/payments", verifyToken, async (req, res) => {
      const result = await paymentCollection.find().toArray()
      res.send(result)
    })

    app.patch("/payments/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id
      const status = req.body.status
      const result = await paymentCollection.updateOne({_id: new ObjectId(id)}, {$set:{status:status}})
      res.send(result)
    })

    
    app.get("/payments/:email", verifyToken, async (req, res) => {
      const email = req.params.email
      if (!email) return res.send({ error: "Email is required" });
      
      const payments = await paymentCollection.aggregate([
        // {$match: {email}},
        {
          $project:{
            transactionId:1,
            email:1,
            status:1,
            price:1,
            cartData:{
              $filter:{
                input:'$cartData',
                as:"cart",
                cond:{$eq:["$$cart.itemOwner", email]}
              }
            }
          }
        },
        {
          $addFields: {
            price: {
              $reduce: {
                input: "$cartData",
                initialValue: 0,
                in: { $add: ["$$value", "$$this.totalPrice"] }, // Sum the totalPrice field
              },
            },
          },
        },
        {$match:{"cartData.0":{$exists:true}}},
      ]).toArray()
      // if(!payments.length) return res.send({message:"No payments found"})
        res.send(payments)
    })
    //!advertise related api
    app.post("/advertise", verifyToken, async (req, res) => {
      const ad = req.body
      const result = await adCollection.insertOne(ad)
      res.send(result)
    })
    app.get("/advertise", async (req, res) => {
      const result = await adCollection.find().toArray()
      res.send(result)
    })
    app.patch("/advertise/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id
      const status = req.body.status
      const result = await adCollection.updateOne({_id: new ObjectId(id)}, {$set:{status:status}})
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
