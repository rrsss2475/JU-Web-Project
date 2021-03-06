import React, { useEffect } from "react";
import { Table, Button, Row, Col, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getAllOrders, updateOrder } from "../actions/orderActions";
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
  const { error: errorDelete, success: successDelete } = orderDelete;

  const orderUpdate = useSelector((state) => state.orderUpdate);
  const { error: errorUpdate, success: successUpdate } = orderUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, successUpdate]);

  const updateHandler = (id, e) => {
    e.preventDefault();
    dispatch(updateOrder(id, e.target.value));
  };

  const [searchStatus, setSearchStatus] = React.useState("");
  const [userSelect, setUserSelect] = React.useState("");
  const [zipSelect, setZipSelect] = React.useState("");

  const userSet = new Set();
  orders.map((order) => {
    if (order.user) {
      userSet.add(order.user.name);
    }
  });

  const zipSet = new Set();
  orders.map((order) => {
    zipSet.add(order.shippingAddress.zip);
  });

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
            <Col md={6}></Col>
            <Col md={2} xs={12}>
              <Form>
                <Form.Group controlId="">
                  <Form.Label id="filter-label">
                    <b>Filter By User :&nbsp;</b>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    onChange={(event) => {
                      setUserSelect(event.target.value);
                    }}
                    id="form-search"
                  >
                    <option value="">NULL</option>
                    {[...userSet].map((user) => (
                      <option value={user}>{user}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col md={2} xs={12}>
              <Form>
                <Form.Group controlId="">
                  <Form.Label id="filter-label">
                    <b>Filter By Zip :&nbsp;</b>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    onChange={(event) => {
                      setZipSelect(event.target.value);
                    }}
                    id="form-search"
                  >
                    <option value="">NULL</option>
                    {[...zipSet].map((zip) => (
                      <option value={zip.toString()}>{zip.toString()}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col md={2} xs={12}>
              <Form>
                <Form.Group controlId="">
                  <Form.Label id="filter-label">
                    <b>Filter By Status :&nbsp;</b>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    onChange={(event) => {
                      setSearchStatus(event.target.value);
                    }}
                    id="form-search"
                  >
                    <option value="">NULL</option>
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
            <Table
              id="table-list"
              striped
              bordered
              hover
              responsive
              className="table-sm"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>TOTAL PRICE</th>
                  <th>PAYMENT METHOD</th>
                  <th>DELIVERY DATE</th>
                  <th>ZIPCODE</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((order) => {
                    if (
                      searchStatus === "" &&
                      userSelect === "" &&
                      zipSelect === ""
                    ) {
                      return order;
                    } else {
                      if (
                        ((order.user && order.user.name === userSelect) ||
                          userSelect === "") &&
                        (order.status
                          .toLowerCase()
                          .includes(searchStatus.toLowerCase()) ||
                          searchStatus === "") &&
                        (order.shippingAddress.zip.toString() === zipSelect ||
                          zipSelect === "")
                      ) {
                        console.log(zipSelect, order.zip);
                        return order;
                      }
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
                      <td>???{order.totalPrice}</td>
                      <td>{order.paymentMethod}</td>
                      <td>
                        {order.status === "Initiated" ||
                        order.status === "Shipped"
                          ? moment(order.toBeDelivered).format("DD-MM-YYYY")
                          : order.status === "Delivered"
                          ? moment(order.deliveredAt).format("DD-MM-YYYY")
                          : ""}
                      </td>
                      <td>{order.shippingAddress.zip}</td>
                      <td>
                        <select
                          class="browser-default custom-select"
                          value={order.status}
                          onChange={(e) => updateHandler(order._id, e)}
                          id="select-search"
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
