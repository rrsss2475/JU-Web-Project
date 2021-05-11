import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDetails } from "../actions/bookingActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import moment from "moment";
import { MyVerticallyCenteredModal } from "../components/Modal";

const BookingScreen = ({ match }) => {
  const bookingId = match.params.id;

  const dispatch = useDispatch();

  const bookingDetails = useSelector((state) => state.bookingDetails);
  const { booking, loading, error } = bookingDetails;

  const { userInfo } = useSelector((state) => state.userLogin);
  const { token } = userInfo;

  useEffect(() => {
    if (!booking || booking._id !== bookingId) {
      dispatch(getBookingDetails(bookingId));
    }
  }, [dispatch, booking, bookingId]);

  const [modalShow, setModalShow] = React.useState(false);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container">
      <h2>Booking {bookingId}</h2>
      <Row style={{ fontFamily: "Rubik, sans-serif" }}>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Your Details</h2>
              {/* <br /> */}
              <p>
                <strong>Name: </strong>
                {booking.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {booking.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {booking.shippingAddress.name}, {booking.shippingAddress.street}
                , {booking.shippingAddress.city},{booking.shippingAddress.state}
                ,{booking.shippingAddress.country},{booking.shippingAddress.zip}
              </p>

              <p>
                <strong>Order Status: </strong>
                {booking.status}
              </p>

              {booking.status !== "Completed" &&
              booking.status !== "Cancelled" ? (
                <p>
                  <strong>Chosen Date: </strong>
                  {moment(booking.toBeCompleted).format("DD-MM-YYYY")}
                </p>
              ) : (
                ""
              )}

              {booking.isCompleted ? (
                <Message variant="success">
                  Completed on{" "}
                  {moment(booking.completedAt).format("DD-MM-YYYY")}
                </Message>
              ) : (
                <Message variant="danger">Not Completed</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {booking.paymentMethod}
              </p>
              {booking.isPaid ? (
                <Message variant="success">
                  Paid on {moment(booking.paidAt).format("DD-MM-YYYY")}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}

              {booking.isPaid && booking.status === "Cancelled" ? (
                <Message variant="warning">
                  Refund Initiated. Will reflect in 2-3 business days
                </Message>
              ) : (
                ""
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Booking Item</h2>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row style={{ fontFamily: "Rubik, sans-serif" }}>
                    <Col md={1}>
                      <Image
                        src={booking.bookingItem.image}
                        alt={booking.bookingItem.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col>{booking.bookingItem.name}</Col>
                    <Col md={4}>
                      Qty: {booking.bookingItem.qty} | ₹
                      {booking.bookingItem.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
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
                  <Col>₹ {booking.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <br />
          {booking.status !== "Cancelled" && booking.status !== "Completed" ? (
            <>
              <Button
                variant="danger"
                style={{ width: "100%" }}
                onClick={() => setModalShow(true)}
              >
                Cancel Booking
              </Button>

              <MyVerticallyCenteredModal
                show={modalShow}
                type={"Booking"}
                id={bookingId}
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

export default BookingScreen;
