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
  getAllOrders,
  deleteOrder,
  updateOrder,
} from "../actions/orderActions";
import { Link } from "react-router-dom";
import { DeleteModal } from "../components/Modal";

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

  return (
    <Container
      style={{
        fontFamily: "Rubik, sans-serif",
      }}
    >
      <Row className="align-items-center">
        <Col>
          <h1>Orders</h1>
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
              {orders.map((order) => (
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
                    <select
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
        </>
      )}
    </Container>
  );
};

export default OrderListScreen;
