import React, { useEffect, useRef } from "react";
import MainBtn from "../../shared/MainBtn";
import useCart from "../../hooks/useCart";
import { useState } from "react";
import useAxiosInstance, { axiosPublic } from "../../hooks/useAxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { ImBin2 } from "react-icons/im";
import { Helmet } from "react-helmet";

const Cart = () => {
  const [cart, refetch] = useCart();
  const { user } = useAuth();
  const axiosSecure = useAxiosInstance();
  const totalRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState();
  const [quantities, setQuantities] = useState({}); // Track quantities for each cart item
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState([]);
  // console.log(quantities);
  // console.log(cart);



  //   delete cart item
  const handleDelete = async (id) => {
    // console.log(id);

    const res = await axiosSecure.delete(`/cart/${id}`);
    console.log(res.data);
    if (res.data) refetch();
  };

  const handleDecrease = async (id) => {
    const res = await axiosSecure.patch(`/cart/${id}`, {value:"decrease"})
    refetch()
  }
  const handleIncrease = async (id) => {
    const res = await axiosSecure.patch(`/cart/${id}`, {value:"increase"})
    refetch()
  }

  //   delete all cart item
  const handleDeleteAll = async () => {
    if (!cart.length) return toast.error("Nothing to clear");
    const res = await axiosSecure.delete(`/delete-all-cart/${user.email}`);
    console.log(res.data);
    if (res.data) refetch();
  };

  // check out function

  useEffect(() => {
    const grandTotal = cart?.reduce((acc, item) => (acc + item.totalPrice), 0)
    setSubtotal(grandTotal)
  }, [handleIncrease, handleDecrease])
  
  return (
    <div className="lg:m-10 lg:p-10 bg-accent rounded-xl">
      <Helmet title="Cart | PharmaOn"/>
      <div className="">
        <h1 className="text-3xl font-bold text-primary text-center mb-5">
          Shopping Cart
        </h1>
        <div className="lg:grid grid-cols-5 gap-5">
          {/* product info section  */}
          <div className="col-span-4 bg-white rounded-xl mb-5 lg:mb-0">
            <div className="overflow-x-auto">
              {cart.length <= 0 ? (
                <div className="flex flex-col justify-center items-center mt-5 gap-5 text-xl text-red-500">
                  No product added
                  <Link to={"/shop"}>
                    <button className="btn block bg-primary text-white">
                      Go back to shop
                    </button>
                  </Link>
                </div>
              ) : (
                <table className="table ">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {cart.map((i, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={i.img}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{i.name}</div>
                              <div className="text-sm opacity-50">
                                {i.company}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>${i.price}</td>
                        <td className="flex items-center gap-3">
                          <button
                          disabled={i.quantity == 1}
                            onClick={() => handleDecrease(i._id)}
                            className="w-6 text-white cursor-pointer select-none"
                          >
                            <img
                              className="w-full"
                              src="https://img.icons8.com/?size=100&id=79029&format=png&color=FA5252"
                              alt=""
                            />
                          </button>
                          <div className="w-5">{i.quantity}</div>
                          <button
                            onClick={() => handleIncrease(i._id)}
                            className="w-6 text-white cursor-pointer select-none"
                          >
                            <img
                              className="w-full"
                              src="https://img.icons8.com/?size=100&id=62888&format=png&color=40C057"
                              alt=""
                            />
                          </button>
                        </td>
                        <th>
                          ${i.totalPrice?.toFixed(2)}
                        </th>
                        <td>
                          <button
                            onClick={() => handleDelete(i._id)}
                            className="btn bg-error btn-sm text-white"
                          >
                            <ImBin2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {/* total section */}
          <div className="col-span-1 p-5 bg-white rounded-xl">
            <h1 className="text-2xl font-semibold">Cart Totals</h1>
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>Subtotal</th>
                      <td>${subtotal?.toFixed(2)}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>Total</th>
                      <td>${subtotal?.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                  <button onClick={() => {navigate("/checkout")}} disabled={cart.length === 0} className="btn bg-primary text-white w-full">Proceed to checkout</button>
              </div>
            </div>
            <div
              onClick={handleDeleteAll}
              className="flex items-center justify-center mt-2"
            >
              <MainBtn text={"Clear all"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
