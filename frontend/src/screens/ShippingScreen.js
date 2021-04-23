import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import useVisibilityToggler from "../components/useVisibilityToggler";
import { getShippingAddress } from "../actions/userActions";
import Address from "../components/Address";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { useParams } from "react-router-dom";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [street, setStreet] = useState(shippingAddress.street);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [zip, setZIP] = useState(shippingAddress.zip);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, street, city, state, zip, country })
    );
    history.push("/payment");
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
      <Form.Group controlId="address">
        <Form.Control
          type="text"
          placeholder="Enter Name"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
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
          <Col>
            <Address address={address} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Container>
      <h1>Shipping</h1>

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
