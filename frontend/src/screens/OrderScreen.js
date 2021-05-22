import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import moment from "moment";
import { MyVerticallyCenteredModal } from "../components/Modal";
import { Link } from "react-router-dom";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const { userInfo } = useSelector((state) => state.userLogin);
  const { token } = userInfo;

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
            <ListGroup.Item id="place-order-screen">
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

              {order.status !== "Delivered" && order.status !== "Cancelled" ? (
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

            <ListGroup.Item id="place-order-screen">
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

              {order.isPaid && order.status === "Cancelled" ? (
                <Message variant="warning">
                  Refund Initiated. Will reflect in 2-3 business days
                </Message>
              ) : (
                ""
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} id="place-order-screen">
                      <Row style={{ fontFamily: "Rubik, sans-serif" }}>
                        <Col md={2} xs={5}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Row>
                            <Col md={4} xs={10}>
                              <Link
                                to={`/products/${item.product.category.name}/${item.product.subCategory.name}/${item.product._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {item.name}
                              </Link>
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
          {order.status !== "Cancelled" && order.status !== "Delivered" ? (
            <>
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
                token={token}
                onHide={() => setModalShow(false)}
              />
            </>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
