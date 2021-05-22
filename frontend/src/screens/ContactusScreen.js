import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Toast,
  Col,
  Row,
  Image,
} from "react-bootstrap";
import emailjs from "emailjs-com";

const ContactusScreen = () => {
  const [contactSuccess, setContactSuccess] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_mbgg01s",
        "template_p1q082k",
        e.target,
        "user_czeANaqCrF9HdVcjbSoJh"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setContactSuccess("Success");
    e.target.reset();
  };

  return (
    <Container style={{ fontFamily: "Rubik, sans-serif", marginTop: "100px" }}>
      <Row>
        <Col md={8} xs={12}>
          <h2 style={{ fontWeight: "700", fontFamily: "Rubik, sans-serif" }}>
            LIVE SUPPORT
          </h2>
          <p>
            <h4>
              24 hours | 7 days a week | 365 days a year Live Technical Support
            </h4>
          </p>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its content. The
            point of using Lorem Ipsum is that it hs a more-or-less normal
            distribution of letters. There are many variations of passages of
            Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look
            even slightly believable. If you are going to use a passage of Lorem
            Ipsum, you need to be sure there isn't anything embarrassing hidden
            in the middle of text.
          </p>
        </Col>

        <Col md={4} xs={12}>
          <Image
            src="https://raw.githubusercontent.com/SouravSaha1999/Mobile-o-Mania/master/ls.jpg"
            // class="img-responsive"
            fluid
          />
        </Col>
      </Row>

      <Row>
        <Col md={8} xs={12}>
          <h2
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              fontFamily: "Rubik, sans-serif",
            }}
          >
            CONTACT US 📞
          </h2>

          <Form
            onSubmit={submitHandler}
            style={{ fontFamily: "Rubik, sans-serif" }}
          >
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter your name"
                name="name"
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Title of your issue"
                name="title"
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your issue"
                name="description"
                required
              />
            </Form.Group>
            <Button variant="warning" type="submit" style={{ width: "100%" }}>
              <b>Submit</b>
            </Button>

            <Toast
              style={{
                color: "green",
                backgroundColor: "lightgreen",
                marginTop: "10px",
              }}
              show={contactSuccess.length != 0}
              onClose={() => {
                setContactSuccess("");
              }}
              delay={3000}
              autohide
            >
              <Toast.Body>Thank you for contacting us.</Toast.Body>
            </Toast>
          </Form>
        </Col>

        <Col
          md={4}
          xs={12}
          style={{ fontFamily: "Rubik, sans-serif", marginTop: "70px" }}
        >
          <h2
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              fontFamily: "Rubik, sans-serif",
            }}
          >
            Company Information
          </h2>
          <p>Jadavpur University SL Campus,</p>
          <p>LB-Block, Salt Lake, Kolkata</p>
          <p>Phone: +91-6666699999</p>
          <p>Email: helpdeskjustintime@gmail.com</p>
          <p>Follow on: Facebook, Instagram</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactusScreen;
