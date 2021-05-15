import React from "react";
import { Card, Container } from "react-bootstrap";

const Creator = ({ person }) => {
  return (
    <Container>
      <Card
        style={{
          width: "10rem",
          background: "linear-gradient(to left, #ffffff, #ffffff)",
          boxShadow: "0px 1px 7px 1px black",
        }}
      >
        <Card.Img
          variant="top"
          // src="holder.js/100px180"
          src="https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png"
          style={{ borderRadius: "50%", background: "white" }}
        />
        <Card.Body style={{ background: "white" }}>
          <Card.Title>
            <center>{person.name}</center>
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Creator;
