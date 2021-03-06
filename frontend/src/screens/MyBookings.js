import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getMyBookings } from "../actions/userActions";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const MyBookings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  const myBookings = useSelector((state) => state.myBookings);
  const { bookings, loading, error } = myBookings;

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
        My Bookings
      </h1>
      {bookings.map((booking) => (
        <>
          {/* <Card border="primary"> */}
          <Card
            className="my-3 rounded"
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 255, 0.3), 0 6px 20px 0 rgba(0, 0, 255, 0.69)",
            }}
          >
            <Card.Header>
              <Row>
                <Col md={4} xs={12}>
                  <h5>
                    <strong>Total Price : ₹ {booking.totalPrice}</strong>
                  </h5>
                </Col>
                {/* <Col></Col> */}
                <Col md={8} xs={12}>
                  <Link
                    to={`/checkout/booking/${booking._id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <h5>
                      <strong>Booking # {booking._id}</strong>
                    </h5>
                  </Link>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <h4>
                  <b>
                    {booking.isCompleted
                      ? "Completed On : " +
                        moment(booking.completedAt).format("DD-MM-YYYY")
                      : booking.status === "Cancelled"
                      ? booking.status
                      : "To be Completed By : " +
                        moment(booking.toBeCompleted).format("DD-MM-YYYY")}
                  </b>
                </h4>
              </Card.Title>
              <br />
              <Card.Text>
                <Row>
                  {/* <Col md={1}></Col> */}
                  <Col md={4} xs={5}>
                    <center>
                      <Image src={booking.bookingItem.image} fluid />
                    </center>
                  </Col>
                  <Col md={4} xs={7}>
                    <center>
                      <h5>
                        <b>{booking.bookingItem.name}</b>
                      </h5>
                    </center>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
          &nbsp;
        </>
      ))}
    </Container>
  );
};

export default MyBookings;
