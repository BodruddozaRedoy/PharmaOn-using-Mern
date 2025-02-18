import React, { useEffect, useRef } from "react";
import MainBtn from "../../shared/MainBtn";
import useCart from "../../hooks/useCart";
import { useState } from "react";
import useAxiosInstance, { axiosPublic } from "../../hooks/useAxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { ImBin2 } from "react-icons/im";

const CartPage = () => {
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

  useEffect(() => {
    const updatedCart = Object.entries(quantities).map(([key, value]) => ({
      key,
      value,
    }));
    setCartTotal(updatedCart);
  }, [quantities]); // Runs only when `quantities` changes
  // console.log(cartTotal);

  // Initialize quantities for each cart item
  useEffect(() => {
    const initialQuantities = cart.reduce((acc, item) => {
      acc[item._id] = 1; // Default quantity of 1 for each item
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  // Calculate the subtotal whenever quantities change
  useEffect(() => {
    const calculatedSubtotal = cart.reduce((acc, item) => {
      const quantity = quantities[item._id] || 1;
      return acc + item.price * quantity;
    }, 0);
    setSubtotal(calculatedSubtotal);
  }, [cart, quantities]);

  // Update quantity for a specific item
  const updateQuantity = (id, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(newQuantity, 1), // Ensure quantity is at least 1
    }));
  };

  //   delete cart item
  const handleDelete = async (id) => {
    // console.log(id);

    const res = await axiosSecure.delete(`/cart/${id}`);
    // console.log(res.data);
    if (res.data) refetch();
  };

  //   delete all cart item
  const handleDeleteAll = async () => {
    if (!cart.length) return toast.error("Nothing to clear");
    const res = await axiosSecure.delete(`/delete-all-cart/${user.email}`);
    // console.log(res.data);
    if (res.data) refetch();
  };

  // check out function
  const handleCheckout = () => {
    if (cart.length === 0) return toast.error("Please add a product!");
    const products = { cartTotal, subtotal };

    localStorage.setItem("cartTotal", JSON.stringify(products));
    navigate("/checkout");
  };
  return (
    <div className="md:m-10 md:p-10 bg-accent dark:text-black rounded-xl">
      <div className="dark:bg-black">
        <h1 className="text-3xl font-bold text-primary text-center mb-5">
          Shopping Cart
        </h1>
        <div className="grid grid-cols-5 gap-5">
          {/* product info section  */}
          <div className="col-span-4 bg-white dark:bg-black rounded-xl">
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
                <table className="table dark:bg-gray-800">
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
                      <tr>
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
                          <div
                            onClick={() => {
                              updateQuantity(
                                i._id,
                                (quantities[i._id] || 1) - 1
                              );
                            }}
                            className="w-6 text-white cursor-pointer select-none"
                          >
                            <img
                              className="w-full"
                              src="https://img.icons8.com/?size=100&id=79029&format=png&color=FA5252"
                              alt=""
                            />
                          </div>
                          <div className="w-5">{quantities[i._id] || 1}</div>
                          <div
                            onClick={() =>
                              updateQuantity(
                                i._id,
                                (quantities[i._id] || 1) + 1
                              )
                            }
                            className="w-6 text-white cursor-pointer select-none"
                          >
                            <img
                              className="w-full"
                              src="https://img.icons8.com/?size=100&id=62888&format=png&color=40C057"
                              alt=""
                            />
                          </div>
                        </td>
                        <th>
                          ${(i.price * (quantities[i._id] || 1)).toFixed(2)}
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
                      <td>${subtotal.toFixed(2)}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>Total</th>
                      <td>${subtotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <div onClick={handleCheckout} className="w-full">
                  <MainBtn text={"Proceed to checkout"} />
                </div>
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

export default CartPage;
