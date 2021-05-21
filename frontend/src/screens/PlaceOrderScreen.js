import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";
import StripeCheckout from "react-stripe-checkout";
import { resetUserCartandOrder } from "../actions/userActions";
import { createOrder } from "../actions/orderActions";
import axios from "axios";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, loading, error } = cart;

  const orderState = useSelector((state) => state.order);
  const { orderItems, totalPrice } = orderState;

  const { userInfo } = useSelector((state) => state.userLogin);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  async function makePayment(token) {
    const body = {
      order: orderState,
      token,
    };

    const headers = {
      "Content-type": "application/json",
    };

    const { data, status } = await axios.post("/payment", body, headers);
    //console.log(data)
    //console.log(status)
    if (data.paid && status === 200) {
      dispatch(
        createOrder({
          orderItems: orderItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          totalPrice: totalPrice,
          isPaid: true,
          paidAt: new Date(),
          paymentResult: {
            id: data.id,
            status: data.status,
            update_time: new Date(),
            email_address: data.billing_details.name,
          },
        })
      );
    }
  }

  useEffect(() => {
    if (success) {
      const orderId = order._id;
      dispatch(resetUserCartandOrder());
      history.push(`/checkout/order/${orderId}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: orderItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
      })
    );
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 type={"products"} />
      <h2>Order Summary</h2>
      <Row style={{ fontFamily: "Rubik, sans-serif" }}>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item id="place-order-screen">
              <h2>Your Details</h2>
              <p>
                <strong>Name: </strong>
                {userInfo.name}
              </p>
              <p>
                <strong>Email: </strong>
                {userInfo.email}
              </p>
              <p>
                <strong>Address: </strong>
                {shippingAddress.name}, {shippingAddress.street},{" "}
                {shippingAddress.city},{shippingAddress.state},
                {shippingAddress.country},{shippingAddress.zip}
              </p>
            </ListGroup.Item>

            <ListGroup.Item id="place-order-screen">
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item id="place-order-screen">
              <h2>Order Items</h2>
              {orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row style={{ fontFamily: "Rubik, sans-serif" }}>
                        <Col md={2} xs={4}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Col>
                            <Row>
                              <Col md={4} xs={10}>
                                {item.name}
                              </Col>
                              <Col md={8} xs={12}>
                                {item.weight !== null ? (
                                  <>Wt: {item.weight * 1000} gm |</>
                                ) : (
                                  <></>
                                )}{" "}
                                Qty: {item.qty} | ₹{item.price}
                              </Col>
                            </Row>
                          </Col>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card
            style={{ border: "2px solid", fontFamily: "Rubik, sans-serif" }}
          >
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Payment Summary</h2>
                <hr />
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>₹ {totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            {paymentMethod === "COD" ? (
              <Button variant="warning" onClick={placeOrderHandler}>
                <strong>Place Order</strong>
              </Button>
            ) : (
              <StripeCheckout
                stripeKey="pk_test_51In4ZVSGLfLBZvSuj7DmeGH97gK74A9C5pdJMf5HLaRQfsrdszwT76UucTnHReckb3juORKpWqnQcYM047VFrbcI00poAQ5P3m"
                token={makePayment}
                name="Card Details"
                amount={totalPrice * 100}
                currency="inr"
              >
                <Button style={{ width: "100%" }} variant="warning">
                  <strong>Place Order and Pay</strong>
                </Button>
              </StripeCheckout>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
