import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Message from "../components/Message";

window.onload = function () {
  const loginBtn = document.querySelectorAll(".login-btn"),
    registerBtn = document.querySelectorAll(".register-btn"),
    lostPassBtn = document.querySelectorAll(".lost-pass-btn"),
    box = document.querySelector(".box"),
    loginForm = document.querySelector(".login-form"),
    registerForm = document.querySelector(".register-form"),
    lostPasswordForm = document.querySelector(".lost-password-form");

  registerBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      box.classList.add("slide-active");
      registerForm.classList.remove("form-hidden");
      loginForm.classList.add("form-hidden");
      lostPasswordForm.classList.add("form-hidden");
    });
  });

  loginBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      box.classList.remove("slide-active");
      registerForm.classList.add("form-hidden");
      loginForm.classList.remove("form-hidden");
      lostPasswordForm.classList.add("form-hidden");
    });
  });

  lostPassBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      registerForm.classList.add("form-hidden");
      loginForm.classList.add("form-hidden");
      lostPasswordForm.classList.remove("form-hidden");
    });
  });
};

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBusiness, setisBusiness] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const regHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <Form onSubmit={regHandler}>
      <div class="register-form form-hidden">
        <h3 style={{ fontWeight: "700" }}>Register</h3>
        {error && <Message variant="danger">{error}</Message>}
        <Form.Group className="form-group" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="submit-btn" variant="success" type="submit">
          Submit
        </Button>
        <p>
          <a href="#" class="login-btn">
            Already have an account?
          </a>
        </p>
      </div>
    </Form>
  );
};

export default RegisterScreen;
