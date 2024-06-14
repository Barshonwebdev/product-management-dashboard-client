import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const CheckoutForm = ({id, name,price }) => {
  const { user } = useAuth();
  const [cardError, setCardError] = useState("");
  const [transaction, setTransaction] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://product-management-dashbaord-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error.message);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log(paymentMethod);
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }

    console.log(paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransaction(paymentIntent.id);

      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        product:name,
        product_id:id,
        date: new Date().toDateString()
        
      };

      axios
        .post("https://product-management-dashbaord-server.vercel.app/payment", payment)
        .then((res) => {
          console.log(res);
        
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your payment is completed",
              showConfirmButton: false,
              timer: 1500,
            });
          
        });
    }
  };

  return (
    <>
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
       <div className="flex justify-center my-5">
       <button
          className="btn btn-primary btn-sm hover:bg-blue-950"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay : ${price}
        </button>
       </div>
      </form>
      <div>{cardError && <p className="text-red-700 mt-2">{cardError}</p>}</div>
      {transaction && (
        <p className="text-green-500">Payment successful. ID: {transaction}</p>
      )}
    </>
  );
};

export default CheckoutForm;
