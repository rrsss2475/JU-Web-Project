import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Row,
  Col,
  Dropdown,
  ButtonGroup,
  Container,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getAllBookings,
  deleteBooking,
  updateBooking,
} from "../actions/bookingActions";
import { Link } from "react-router-dom";
import { DeleteModal } from "../components/Modal";
import moment from "moment";

const BookingListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const [bookingid, setBookingId] = React.useState();

  const bookingList = useSelector((state) => state.bookingList);
  const { loading, error, bookings } = bookingList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bookingDelete = useSelector((state) => state.bookingDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookingDelete;

  const bookingUpdate = useSelector((state) => state.bookingUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bookingUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllBookings());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, successUpdate]);

  // const deleteHandler = (id) => {
  // 	if (window.confirm("Are you sure")) {
  // 		dispatch(deleteOrder(id))
  // 	}
  // 	//console.log(loadingDelete)
  // }

  const updateHandler = (id, e) => {
    e.preventDefault();
    dispatch(updateBooking(id, e.target.value));
  };

  const [searchStatus, setSearchStatus] = React.useState("");

  return (
    <Container
      style={{
        fontFamily: "Rubik, sans-serif",
      }}
    >
      <Row className="align-items-center">
        <Col>
          <h1>
            <center>Bookings</center>
          </h1>
        </Col>
      </Row>
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>
                    <b>Filter By Status : </b>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    onChange={(event) => {
                      setSearchStatus(event.target.value);
                    }}
                  >
                    <option value="Initiated">Initiated</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>TOTAL PRICE</th>
                  <th>PAYMENT METHOD</th>
                  <th>DELIVERY DATE</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .filter((booking) => {
                    if (searchStatus == "") {
                      return booking;
                    } else if (
                      booking.status
                        .toLowerCase()
                        .includes(searchStatus.toLowerCase())
                    ) {
                      return booking;
                    }
                  })
                  .map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <Link
                          to={`/checkout/booking/${booking._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {booking._id}
                        </Link>
                      </td>
                      <td>
                        {booking.user ? booking.user.name : "---DELETED---"}
                      </td>
                      <td>₹{booking.totalPrice}</td>
                      <td>{booking.paymentMethod}</td>
                      <td>
                        {booking.status == "Initiated"
                          ? moment(booking.toBeCompleted).format("DD-MM-YYYY")
                          : booking.status == "Completed"
                          ? moment(booking.completedAt).format("DD-MM-YYYY")
                          : ""}
                      </td>
                      <td>
                        <select
                          class="browser-default custom-select"
                          value={booking.status}
                          onChange={(e) => updateHandler(booking._id, e)}
                        >
                          <option value="Initiated">Initiated</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => {
                            setModalShow(true);
                            setBookingId(booking._id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <DeleteModal
                show={modalShow}
                type={"Booking"}
                id={bookingid}
                onHide={() => setModalShow(false)}
              />
            </Table>
          </Row>
        </>
      )}
    </Container>
  );
};

export default BookingListScreen;
