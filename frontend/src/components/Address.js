import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  FormControl,
  Button,
  InputGroup,
  Container,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { saveShippingAddress } from "../actions/cartActions";

const Address = ({ address, step, type }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const addressSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(address));
    history.push({ pathname: `/checkout/${type}/payment` });
    // console.log(address._id);
  };

  var btn = <h1></h1>;

  if (step) {
    btn = (
      <>
        <hr style={{ borderWidth: "2px", borderColor: "green" }} />
        <Button onClick={addressSubmit} type="submit" variant="warning">
          <strong>Deliver Here</strong>
        </Button>
      </>
    );
  }

  let body = (
    <Card
      className="my-3"
      style={{
        border: "2px solid",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
      }}
    >
      <Card.Header style={{ backgroundColor: "#ffc107" }} as="h5">
        <strong>Address</strong>
      </Card.Header>
      <Card.Body>
        <Card.Title as="div" style={{ fontFamily: "Rubik, sans-serif" }}>
          <h5>
            <strong>{address.name}</strong>
            <br />
            {address.street}
            <br />
            {address.city}
            <br />
            {address.state}
            <br />
            {address.zip}
            <br />
            {address.country}
            <br />
          </h5>
        </Card.Title>
        <center>{btn}</center>
      </Card.Body>
    </Card>
  );

  return <div>{body}</div>;
};

export default Address;
