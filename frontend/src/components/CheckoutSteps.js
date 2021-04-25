import React from "react";
import { Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav
      className="justify-content-center mb-4"
      style={{ fontSize: "20px", fontFamily: "Rubik, sans-serif" }}
    >
      <Nav.Item className="font-weight-bold">
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="font-weight-bold">
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Address</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Address</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className="font-weight-bold">
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className="font-weight-bold">
        {step4 ? (
          <LinkContainer to="/order">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
