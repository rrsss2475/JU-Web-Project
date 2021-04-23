import React from "react";
import {
  Card,
  FormControl,
  Button,
  InputGroup,
  Container,
} from "react-bootstrap";

const Address = ({ address }) => {
  let body = (
    <Card className="my-3 p-3 rounded" style={{ border: "2px solid" }}>
      <Card.Body>
        <Card.Title as="div">
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
        </Card.Title>
        <hr style={{ borderWidth: "2px", borderColor: "green" }} />
        <center>
          <Button type="submit" variant="warning">
            <strong>Deliver Here</strong>
          </Button>
        </center>
      </Card.Body>
    </Card>
  );

  return <div>{body}</div>;
};

export default Address;
