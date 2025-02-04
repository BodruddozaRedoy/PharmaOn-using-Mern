import React, { useEffect, useState } from "react";
import useCheckout from "../../hooks/useCheckout";
import MainBtn from "../../shared/MainBtn";
import useCart from "../../hooks/useCart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutPage = () => {
  // const { cartTotal, subtotal } = useCheckout();
  const [stripeActive, setStripeActive] = useState(false);
  const [cart] = useCart();
  const { user } = useAuth();
  const [details, setDetails] = useState("");
  const [grandTotal, setGrandTotal] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const result = cart?.filter((product) =>
  //   cartTotal.some((item) => item.key == product._id)
  // );

  const handleSubmitAddress = (data) => {
    // console.log(data);
    setDetails(data);
  };

  useEffect(() => {
    const grandTotal = cart?.reduce((acc, item) => acc + item.totalPrice, 0);
    setGrandTotal(grandTotal)
  }, [cart])
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:m-10">
      <Helmet title="Checkout | PharmaOn"/>

      {/* 1st grid */}
      <div className="col-span-2 space-y-5">
        {/* payment */}
        <div className="rounded-xl bg-accent p-5 lg:p-10">
          <h1 className="font-semibold text-2xl mb-5">Express Checkout</h1>
          <div className="flex gap-3">
            <div onClick={() => setStripeActive(true)} className="w-[50%]">
              <MainBtn text={"Stripe"} />
            </div>
            <div className="w-[50%]">
              <MainBtn text={"Paypal"} />
            </div>
            <div className="w-[50%]">
              <MainBtn text={"SSL"} />
            </div>
          </div>
            <div className="my-5 bg-white p-5 rounded-xl">
              <Elements stripe={stripePromise}>
                <CheckoutForm grandTotal={grandTotal} details={details} />
              </Elements>
            </div>
        </div>
        {/* address details */}
        <div className="rounded-xl bg-accent p-5 lg:p-10 ">
          {/* Name */}
          <h1 className="font-semibold text-2xl  col-span-2">
            Shipping Details
          </h1>
          <form
            onSubmit={handleSubmit(handleSubmitAddress)}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Full Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                defaultValue={user?.displayName}
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />
              {errors?.name && (
                <span className="text-error">Full Name is required</span>
              )}
            </label>
            {/* Email */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email Address</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                defaultValue={user?.email}
                {...register("email", { required: true })}
                className="input input-bordered w-full"
              />
              {errors?.email && (
                <span className="text-error">Email is required</span>
              )}
            </label>
            {/* Phone  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Phone Number</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                {...register("phoneNumber", { required: true })}
                className="input input-bordered w-full"
              />
              {errors?.phoneNumber && (
                <span className="text-error">Phone Number is required</span>
              )}
            </label>
            {/* Address  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Address</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                {...register("address", { required: true })}
                className="input input-bordered w-full"
              />
              {errors?.address && (
                <span className="text-error">Address is required</span>
              )}
            </label>
            {/* Apt.suite */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Apt. Suite</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                {...register("apt")}
                className="input input-bordered w-full"
              />
            </label>
            {/* Country  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Country</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                {...register("country", { required: true })}
                className="input input-bordered w-full"
              />
              {errors?.country && (
                <span className="text-error">Country Name is required</span>
              )}
            </label>
            <button
              type="submit"
              disabled={details}
              className="btn bg-primary text-white col-span-2"
            >
              Add Details
            </button>
          </form>
        </div>
      </div>
      {/* 2nd grid  */}
      <div>
        <div className="bg-accent rounded-xl p-5 lg:p-10">
          <h1 className="font-semibold text-2xl mb-5">Product Details</h1>
          {/* product  */}
          <div className="overflow-x-auto bg-white rounded-xl p-3">
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  {/* <th>Total Price</th> */}
                </tr>
              </thead>
              <tbody>
                {cart?.map((i, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{i.name}</td>
                    <td>{i.quantity}</td>
                    <td>{i.totalPrice}</td>
                    {/* <td>Quality Control Specialist</td> */}
                  </tr>
                ))}
                <tr className="border-t">
                  <td></td>
                  <td></td>
                  <td>Grand Total</td>
                  <td>${grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h1 className="font-semibold text-2xl my-5">Address Details</h1>
          <div className="overflow-x-auto bg-white rounded-xl p-3">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  {/* <th>Total Price</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Full Name</th>
                  <td>{details?.name}</td>
                </tr>
                <tr>
                  <td>Email Address</td>
                  <td>{details?.email}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>{details?.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{details?.address}</td>
                </tr>
                <tr>
                  <td>Apt. Suite</td>
                  <td>{details?.apt}</td>
                </tr>
                <tr>
                  <td>Country Name</td>
                  <td>{details?.country}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
