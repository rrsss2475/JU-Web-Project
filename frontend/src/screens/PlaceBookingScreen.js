import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";
import StripeCheckout from "react-stripe-checkout";
import { resetUserCartandOrder } from "../actions/userActions";
import { createBooking, resetUserBooking } from "../actions/bookingActions";
import axios from "axios";

const PlaceBookingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, loading, error } = cart;

  const bookingState = useSelector((state) => state.booking);
  const { bookingItem } = bookingState;

  const { userInfo } = useSelector((state) => state.userLogin);

  const bookingCreate = useSelector((state) => state.bookingCreate);
  const { booking, success } = bookingCreate;

  async function makePayment(token) {
    const body = {
      order: bookingItem,
      token,
    };

    const headers = {
      "Content-type": "application/json",
    };

    const { data, status } = await axios.post("/payment", body, headers);

    if (data.paid && status === 200) {
      dispatch(
        createBooking({
          bookingItem: {
            name: bookingItem.service.name,
            image: bookingItem.service.image,
            qty: bookingItem.qty,
            price: bookingItem.service.price,
            service: bookingItem.service._id,
          },
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          totalPrice: bookingItem.totalPrice,
          isPaid: true,
          paidAt: new Date(),
          paymentResult: {
            id: data.id,
            status: data.status,
            update_time: new Date(),
            email_address: data.billing_details.name,
          },
          toBeCompleted: bookingItem.date,
        })
      );
    }
  }

  useEffect(() => {
    if (success) {
      const bookingId = booking._id;
      dispatch(resetUserBooking());
      history.push(`/checkout/booking/${bookingId}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeBookingHandler = () => {
    dispatch(
      createBooking({
        bookingItem: {
          name: bookingItem.service.name,
          image: bookingItem.service.image,
          qty: bookingItem.qty,
          price: bookingItem.service.price,
          service: bookingItem.service._id,
        },
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        totalPrice: bookingItem.totalPrice,
        toBeCompleted: bookingItem.date,
      })
    );
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container">
      <CheckoutSteps step1 step2 step3 type={"services"} />
      <h2>Booking Summary</h2>
      <Row style={{ fontFamily: "Rubik, sans-serif" }}>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Your Details</h2>
              {/* <br /> */}
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

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Booking Items</h2>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row style={{ fontFamily: "Rubik, sans-serif" }}>
                    <Col md={2} xs={5}>
                      <Image
                        src={bookingItem.service.image}
                        alt={bookingItem.service.name}
                      />
                    </Col>
                    <Col>{bookingItem.service.name}</Col>
                    <Col md={4}>
                      Qty: {bookingItem.qty} | ₹{bookingItem.service.price}
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
                  <Col>₹ {bookingItem.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            {paymentMethod === "COD" ? (
              <Button variant="warning" onClick={placeBookingHandler}>
                <strong>Place Booking</strong>
              </Button>
            ) : (
              <StripeCheckout
                stripeKey="pk_test_51In4ZVSGLfLBZvSuj7DmeGH97gK74A9C5pdJMf5HLaRQfsrdszwT76UucTnHReckb3juORKpWqnQcYM047VFrbcI00poAQ5P3m"
                token={makePayment}
                name="Card Details"
                amount={bookingItem.totalPrice * 100}
                currency="inr"
              >
                <Button style={{ width: "100%" }} variant="warning">
                  <strong>Place Booking and Pay</strong>
                </Button>
              </StripeCheckout>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceBookingScreen;
