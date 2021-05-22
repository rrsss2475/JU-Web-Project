import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4, type }) => {
  return type === "products" ? (
    <Nav
      className="justify-content-center mb-4"
      style={{ fontSize: "20px", fontFamily: "Rubik, sans-serif" }}
      id="checkout-steps"
    >
      <Nav.Item className="font-weight-bold">
        {step1 ? (
          <LinkContainer to="/cart">
            <Nav.Link>Cart</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Cart</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="font-weight-bold">
        {step2 ? (
          <LinkContainer to="/checkout/products/shipping">
            <Nav.Link>Address</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Address</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className="font-weight-bold">
        {step3 ? (
          <LinkContainer to="/checkout/products/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className="font-weight-bold">
        {step4 ? (
          <LinkContainer to="/checkout/order">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  ) : (
    <Nav
      className="justify-content-center mb-4"
      style={{ fontSize: "20px", fontFamily: "Rubik, sans-serif" }}
    >
      <Nav.Item className="font-weight-bold">
        {step1 ? (
          <LinkContainer to="/checkout/services/shipping">
            <Nav.Link>Address</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Address</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="font-weight-bold">
        {step2 ? (
          <LinkContainer to="/checkout/services/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="font-weight-bold">
        {step3 ? (
          <LinkContainer to="/checkout/booking">
            <Nav.Link>Place Booking</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Booking</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
