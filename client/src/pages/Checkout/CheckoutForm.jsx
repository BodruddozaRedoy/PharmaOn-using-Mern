import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ grandTotal, details }) => {
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const [error, setError] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosInstance();
  const navigate = useNavigate()

  useEffect(() => {
    axiosSecure
      .post(`/create-payment-intent`, { price: grandTotal})
      .then((res) => {
        // console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, grandTotal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) return;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      //   console.log(error);
      toast.error(error.message);
    } else {
      //   console.log(paymentMethod);
    }

    //   confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: details?.name,
            email: details?.email,
            address: details?.address,
            phone: details?.phoneNumber,
          },
        },
      });

    if (confirmError) {
      // console.log(confirmError);
    } else {
      // console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log(paymentIntent);
        
        const payment = {
          transactionId: paymentIntent.id,
          email: user?.email,
          price: grandTotal,
          date: new Date(),
          cartIds: cart?.map((item) => item._id),
          cartData: cart,
          status: "pending",
          billingDetails: details
        };
        const res = await axiosSecure.post("/payments", payment);
        if (res.data) {
          localStorage.setItem('payment', JSON.stringify(payment))
          toast.success("Payment successful");
          refetch();
          navigate("/invoice")
        }
        // console.log(res.data);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          disabled={!stripe || !clientSecret || !details}
          type="submit"
          className="btn bg-success text-white mt-5"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
