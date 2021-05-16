import React, { useEffect } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Dropdown,
  ButtonGroup,
  Container,
  FormControl,
  DropdownButton,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getAllOrders,
  deleteOrder,
  updateOrder,
} from "../actions/orderActions";
import { Link } from "react-router-dom";
import { DeleteModal } from "../components/Modal";
import moment from "moment";

const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const [orderid, setOrderId] = React.useState();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const orderUpdate = useSelector((state) => state.orderUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = orderUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
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
    dispatch(updateOrder(id, e.target.value));
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
            <center>Orders</center>
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
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
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
                {orders
                  .filter((order) => {
                    if (searchStatus == "") {
                      return order;
                    } else if (
                      order.status
                        .toLowerCase()
                        .includes(searchStatus.toLowerCase())
                    ) {
                      return order;
                    }
                  })
                  .map((order) => (
                    <tr key={order._id}>
                      <td>
                        <Link
                          to={`/checkout/order/${order._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {order._id}
                        </Link>
                      </td>
                      <td>{order.user ? order.user.name : "---DELETED---"}</td>
                      <td>₹{order.totalPrice}</td>
                      <td>{order.paymentMethod}</td>
                      <td>
                        {order.status == "Initiated" ||
                        order.status == "Shipped"
                          ? moment(order.toBeDelivered).format("DD-MM-YYYY")
                          : order.status == "Delivered"
                          ? moment(order.deliveredAt).format("DD-MM-YYYY")
                          : ""}
                      </td>
                      <td>
                        <select
                          class="browser-default custom-select"
                          value={order.status}
                          onChange={(e) => updateHandler(order._id, e)}
                        >
                          <option value="Initiated">Initiated</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => {
                            setModalShow(true);
                            setOrderId(order._id);
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
                type={"Order"}
                id={orderid}
                onHide={() => setModalShow(false)}
              />
            </Table>
          </Row>
        </>
      )}
    </Container>
  );
};

export default OrderListScreen;
