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
          src="https://scontent.fdel1-3.fna.fbcdn.net/v/t1.6435-9/165277385_3808293815892352_5703735070284205032_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=80QNcib1rhYAX_XZptO&_nc_ht=scontent.fdel1-3.fna&oh=9bf6e9e16fc31a1a34dcdc8a428d9a95&oe=60CA6FB7"
          // style={{ borderRadius: "50%", background: "white" }}
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
