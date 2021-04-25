import React from "react";
import { useSelector } from "react-redux";
import Address from "../components/Address";
import CheckoutSteps from "../components/CheckoutSteps";

const OrderScreen = ({ location }) => {
  const addressList = useSelector((state) => state.addressList);
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  // console.log(location.state.detail);
  console.log(shippingAddress);
  return (
    <div class="container">
      <CheckoutSteps step1 step2 step3 step4 />
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Order Summary
      </h1>
      <Address address={shippingAddress} />
    </div>
  );
};

export default OrderScreen;
