import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getMyOrders } from "../actions/userActions";
import { Container, Card, Row, Col, Image, CardDeck } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const MyOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const myOrders = useSelector((state) => state.myOrders);
  const { orders, loading, error } = myOrders;

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          marginTop: "50px",
        }}
      >
        My Orders
      </h1>
      {orders.map((order) => (
        <>
          <Card border="primary">
            <Card.Header>
              <Row>
                <Col>
                  <strong>Total Price : ₹ {order.totalPrice}</strong>
                </Col>
                {/* <Col></Col> */}
                <Col>
                  <Link to={`/order/${order._id}`}>
                    <strong>Order # {order._id}</strong>
                  </Link>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <h4>
                  {order.status}
                  &nbsp;&nbsp;
                  {order.status === "Delivered"
                    ? moment(order.toBeDelivered).format("DD-MM-YYYY")
                    : ""}
                </h4>
              </Card.Title>
              <Card.Text>
                {order.orderItems.map((item) => (
                  <Row>
                    <Col md={1}></Col>
                    <Col md={2}>
                      <Image src={item.image} fluid />
                    </Col>
                    <Col md={1}></Col>
                    <Col>
                      <h5>{item.name}</h5>
                    </Col>
                  </Row>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
          &nbsp;
        </>
      ))}
    </Container>
  );
};

export default MyOrders;
