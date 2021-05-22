import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import RegisterScreen from "../screens/RegisterScreen";

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

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div class="login-page">
      <div class="box">
        <div class="left">
          <h3>Create Account</h3>
          <button type="button" class="register-btn">
            Register
          </button>
        </div>
        <div class="right">
          <h3>Have an Account ?</h3>
          <button type="button" class="login-btn">
            Login
          </button>
        </div>
        <div className="form">
          <Form onSubmit={submitHandler}>
            {/* LOGIN-FORM START */}
            <div class="login-form">
              <h3 style={{ fontWeight: "700" }}>Log In</h3>
              {error && <Message variant="danger">{error}</Message>}
              <Form.Group className="form-group" controlId="formBasicEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicPassword">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="myInput"
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formBasicCheckbox">
                <Form.Check
                  onClick={myFunction}
                  type="checkbox"
                  label="Show Password"
                />
              </Form.Group>
              <Button className="submit-btn" variant="success" type="submit">
                Submit
              </Button>
              <p>
                <a href="#" class="lost-pass-btn">
                  Lost Your Password ?
                </a>
              </p>
            </div>
            {/* LOGIN-FORM END */}

            {/* LOST-PASSWORD START */}

            <div class="lost-password-form form-hidden">
              <h3>Lost Your Password ?</h3>
              <h5>
                You will receive a link to create a new password via email.
              </h5>

              <Form.Group className="form-group" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="form-control"
                />
              </Form.Group>

              <Button className="submit-btn" variant="success" type="submit">
                Submit
              </Button>
              <p>
                <a href="#" class="login-btn">
                  Login
                </a>{" "}
                |{" "}
                <a href="#" class="register-btn">
                  Register
                </a>
              </p>
            </div>
            {/* LOST-PASSWORD END */}
          </Form>

          {/* REGISTER-FORM START */}
          <RegisterScreen />
          {/* REGISTER-FORM END */}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
