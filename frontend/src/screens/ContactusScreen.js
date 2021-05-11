// import axios from "axios";
import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";

const ContactusScreen = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    // const dataToSubmit = {
    //   name,
    //   email,
    //   title,
    //   description,
    // };
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
    e.target.reset();
  };
  return (
    <Container style={{ marginTop: "100px" }}>
      <div class="row">
        <div class="col-lg-5">
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
        </div>

        <div class="col-lg-2">
          <img
            src="https://raw.githubusercontent.com/SouravSaha1999/Mobile-o-Mania/master/ls.jpg"
            class="img-responsive"
            alt=""
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8">
          <h2
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              fontFamily: "Rubik, sans-serif",
            }}
          >
            CONTACT US 📞
          </h2>
          {/* 
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Title of your issue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your issue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form> */}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter your name"
                name="name"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Title of your issue"
                name="title"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your issue"
                name="description"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>

        <div style={{ marginTop: "70px" }} class="col-lg-4">
          <h2
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              fontFamily: "Rubik, sans-serif",
            }}
          >
            Company Information
          </h2>
          <p>833 Mayflower Ave, GD-700106,</p>
          <p>Street No. 3A, Rajarhat, Kolkata</p>
          <p>Phone: +91-6666699999</p>
          <p>Email: helpdeskjustintime@gmail.com</p>
          <p>Follow on: Facebook, Instagram</p>
        </div>
      </div>
    </Container>
  );
};

export default ContactusScreen;
