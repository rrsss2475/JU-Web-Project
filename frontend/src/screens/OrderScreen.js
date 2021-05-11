import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import moment from "moment";
import { MyVerticallyCenteredModal } from "../components/Modal";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  const [modalShow, setModalShow] = React.useState(false);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container">
      <h2>Order {orderId}</h2>
      <Row style={{ fontFamily: "Rubik, sans-serif" }}>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Your Details</h2>
              {/* <br /> */}
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.name}, {order.shippingAddress.street},{" "}
                {order.shippingAddress.city},{order.shippingAddress.state},
                {order.shippingAddress.country},{order.shippingAddress.zip}
              </p>
              <p>
                <strong>Order Status: </strong>
                {order.status}
              </p>

              {order.status !== "Delivered" ? (
                <p>
                  <strong>Delivery By: </strong>
                  {moment(order.toBeDelivered).format("DD-MM-YYYY")}
                </p>
              ) : (
                ""
              )}
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {moment(order.deliveredAt).format("DD-MM-YYYY")}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {moment(order.paidAt).format("DD-MM-YYYY")}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row style={{ fontFamily: "Rubik, sans-serif" }}>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {/* <Link to={`/product/${item.product}`}> */}
                          {item.name}
                          {/* </Link> */}
                        </Col>
                        <Col md={5}>
                          {item.weight !== null ? (
                            <>Wt: {item.weight * 1000} gm |</>
                          ) : (
                            <></>
                          )}{" "}
                          Qty: {item.qty} | ₹{item.price}
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
                  <Col>₹ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <br />
          <Button
            variant="danger"
            style={{ width: "100%" }}
            onClick={() => setModalShow(true)}
          >
            Cancel Order
          </Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            type={"Order"}
            id={orderId}
            onHide={() => setModalShow(false)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
