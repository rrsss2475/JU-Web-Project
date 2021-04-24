import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import useVisibilityToggler from "../components/useVisibilityToggler";
import { getShippingAddress, addShippingAddress } from "../actions/userActions";
import Address from "../components/Address";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZIP] = useState("");
  const [country, setCountry] = useState("");

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addShippingAddress(name, street, city, state, zip, country));
    history.go(0);
  };

  const addressList = useSelector((state) => state.addressList);
  const { loading, error, addresses } = addressList;

  console.log(addresses);
  console.log(addressList);

  useEffect(() => {
    dispatch(getShippingAddress());
  }, [dispatch]);

  const [AddressFormComponent, toggleCardVisibility] = useVisibilityToggler(
    <Form
      className="my-3 p-3 rounded"
      style={{ border: "2px dashed green" }}
      id="form1"
      onSubmit={submitHandler}
    >
      <Form.Group controlId="name">
        <Form.Control
          type="text"
          placeholder="Enter Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="street">
        <Form.Control
          type="text"
          placeholder="Enter Street"
          value={street}
          required
          onChange={(e) => setStreet(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Control
          type="text"
          placeholder="Enter City"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="state">
        <Form.Control
          type="text"
          placeholder="Enter State"
          value={state}
          required
          onChange={(e) => setState(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="zip">
        <Form.Control
          type="text"
          placeholder="Enter ZIP"
          value={zip}
          required
          onChange={(e) => setZIP(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="country">
        <Form.Control
          type="text"
          placeholder="Enter Country"
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <center>
        <Button type="submit" variant="warning">
          <strong>Add</strong>
        </Button>
      </center>
    </Form>,
    false
  );

  let body = <h1></h1>;

  if (!loading) {
    body = (
      <Row>
        {addresses.map((address) => (
          <Col sm={12} md={6} lg={4} xl={4}>
            <Address address={address} step={"shipping"} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Container>
      <CheckoutSteps step1 step2 />
      <h1
        style={{
          fontWeight: "900",
          fontFamily: "Reggae One",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Shipping Address
      </h1>

      <Button
        type="submit"
        variant="success"
        style={{ marginTop: "20px", marginBottom: "30px" }}
        onClick={toggleCardVisibility}
      >
        <i class="far fa-plus-square"></i> Add New Address
      </Button>
      {AddressFormComponent}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        body
      )}
    </Container>
  );
};

export default ShippingScreen;
