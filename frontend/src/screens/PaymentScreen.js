import React, { useState } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import { useHistory } from "react-router";

const PaymentScreen = ({ match }) => {
  const type = match.params.type;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  //   if (!shippingAddress.address) {
  //     history.push("/shipping");
  //   }

  const history = useHistory();

  const [paymentMethod, setPaymentMethod] = useState("Online Payment");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    if (type == "products") {
      history.push({
        pathname: "/checkout/order",
      });
    } else {
      history.push({
        pathname: "/checkout/booking",
      });
    }
    // history.push("/placeorder");
  };

  return (
    <Container>
      {type == "products" ? (
        <CheckoutSteps step1 step2 step3 type={type} />
      ) : (
        <CheckoutSteps step1 step2 type={type} />
      )}
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Payment Methods
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend" style={{ fontSize: "24px" }}>
            <strong>Choose your payment option</strong>
          </Form.Label>
          <Col>
            <Row>
              <Form.Check
                type="radio"
                label="Online Payment"
                id="Online Payment"
                name="paymentMethod"
                value="Online Payment"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Col>
                <i class="fas fa-credit-card"></i>
              </Col>
            </Row>
            <Row>
              <Form.Check
                type="radio"
                label="COD"
                id="COD"
                name="paymentMethod"
                value="COD"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Col>
                <i class="fas fa-money-check-alt"></i>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Button type="submit" variant="warning">
          <strong>Continue</strong>
        </Button>
      </Form>
    </Container>
  );
};

export default PaymentScreen;
