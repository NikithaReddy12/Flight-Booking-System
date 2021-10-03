import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeButton = ({ price,newBooking }) => {
  const publishableKey = "pk_test_51JfkeZSGSyEcekg4AKqfkVS19Sw4s5EF0bIuA6PQF14hjX2UWQPiqJRoivo4VIfHmuHTvlle4dxVWJ4XYSgWQCby00dLNQfBL8";
  const stripePrice = price * 100;

  const onToken = (token) => {
    console.log(token);
    console.log(newBooking)
    axios
      .post("http://localhost:8083/payment", 
      {
        amount: stripePrice,
        token,
      })
      .then((response) => {
        console.log(response);
        alert("payment success");
      })
      .catch((error) => {
        console.log(error);
        alert("Payment failed");
        axios.post('http://localhost:8090/book/bookticket', newBooking)
        .then(response => response)
        .catch(error => console.log(error))
      });
  };

  return (
    <StripeCheckout
      amount={stripePrice}
      label="Pay Now"
      name="Wolf Elite"
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      currency="INR"
    />
  );
};

export default StripeButton;