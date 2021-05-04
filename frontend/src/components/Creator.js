import React from "react";
import { Card, Button, Container } from "react-bootstrap";

const Creator = ({ person }) => {
  return (
    <Container>
      <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{person.name}</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Creator;
