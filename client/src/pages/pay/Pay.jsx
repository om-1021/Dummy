import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NUFHGSFwnpGRs91ATa4xO9nR1dXNZ7loG9EgNHCXgOpNgZQe7RpHZFlWQ44xCLZ2Dti8PKZYzPaZ9WW5fsNUr0800H12OHIpB"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      <Helmet>
      <meta http-equiv="Content-Security-Policy" content="frame-src *;"/> 
      <meta http-equiv="Content-Security-Policy" content="img-src 'self' data:"/>
      </Helmet>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
