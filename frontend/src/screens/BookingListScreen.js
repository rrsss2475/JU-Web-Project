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

  return (
    <Container
      style={{
        fontFamily: "Rubik, sans-serif",
      }}
    >
      <Row className="align-items-center">
        <Col>
          <h1>Bookings</h1>
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
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>TOTAL PRICE</th>
                <th>PAYMENT METHOD</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>
                    <Link
                      to={`/checkout/booking/${booking._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {booking._id}
                    </Link>
                  </td>
                  <td>{booking.user ? booking.user.name : "---DELETED---"}</td>
                  <td>₹{booking.totalPrice}</td>
                  <td>{booking.paymentMethod}</td>
                  <td>
                    <select
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
        </>
      )}
    </Container>
  );
};

export default BookingListScreen;
