import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  FormControl,
  Button,
  InputGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

const OrderItems = ({}) => {
  const orderList = useSelector((state) => state.order);
  const { loading, error, orderItems, totalPrice } = orderList;

  let body = (
    // <Card className="my-3 p-3 rounded" style={{ border: "2px solid" }}>
    <Card
      className="my-3"
      style={{
        // width: "40rem",
        border: "2px solid",
        marginLeft: "auto",
        marginRight: "auto",
        // textAlign: "center",
      }}
    >
      <Card.Header
        style={{ backgroundColor: "#ffc107" }}
        className="text-center"
        bg="warning"
        as="h5"
      >
        <strong>Items</strong>
      </Card.Header>
      <Card.Body>
        {orderItems.map((item) => (
          <Col style={{ padding: "5px" }}>
            <Row style={{ padding: "5px" }}>
              <img
                src={item.image}
                style={{
                  height: "150px",
                  width: "150px",
                }}
                alt={item.name}
              ></img>
              <h5 style={{ marginLeft: " 220px" }}>
                Name : {item.name}
                <br />
                Qty : {item.qty}
                <br />
                Weight : {item.weight ? <>{item.weight * 1000}</> : <></>}
                <br />
                Price : {item.price}
              </h5>
            </Row>
          </Col>
        ))}
        <hr style={{ border: "1px solid green" }} />
        <h4 style={{ float: "right" }}>
          <strong>Total Amount</strong> : Rs. {totalPrice}
        </h4>
      </Card.Body>
    </Card>
  );

  return <div>{body}</div>;
};

export default OrderItems;
