import React, { useEffect } from "react";
import {
  Nav,
  NavDropdown,
  Dropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";
import img from "../images/logo3.png";

const Navbar = ({}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <div
        className="marquee"
        style={{
          marginTop: "10px",
          color: "white",
          fontWeight: "700",
          textAlign: "center",
          fontSize: "17px",
          letterSpacing: "3px",
          border: "1px solid #000000",
          // padding: "10px",
          background: "rgb(0, 168, 0)",
          // fontFamily: "Kaushan Script",
          fontFamily: "Rubik, sans-serif",
          textShadow: "1px 1px 10px blue, 1px 1px 10px white",
        }}
      >
        <p>GET FLAT 10% OFF ON ALL ORDERS AND BOOKINGS</p>
      </div>

      <Nav
        // id="nav1"
        class="navbar navbar-expand-lg navbar-light bg-transparent"
      >
        <NavLink
          id="nav-brand"
          class="navbar-brand text-white font-weight-bold"
          to="/"
        >
          <img
            src={img}
            alt="Just in Time Online Watch Store"
            width="150"
            height="60"
          />
          {/* JUstintime */}
        </NavLink>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-lg-0">
            <li class="nav-item">
              <NavLink
                className="nav-link text-uppercase font-weight-bold text-success"
                to="/"
                exact
                style={{
                  fontWeight: "900",
                  fontFamily: "Rubik, sans-serif",
                  fontSize: "16px",
                }}
              >
                Home&nbsp;<i class="fas fa-home"></i>
                <span class="sr-only">(current)</span>
              </NavLink>
            </li>

            <li class="nav-item">
              <NavLink
                className="nav-link text-uppercase font-weight-bold text-success"
                to="/aboutus"
                exact
                style={{
                  fontWeight: "900",
                  fontFamily: "Rubik, sans-serif",
                  fontSize: "16px",
                }}
              >
                About Us&nbsp;<i class="fas fa-info-circle"></i>
              </NavLink>
            </li>

            <li class="nav-item">
              <NavLink
                className="nav-link text-uppercase font-weight-bold text-success"
                to="/contactus"
                exact
                style={{
                  fontWeight: "900",
                  fontFamily: "Rubik, sans-serif",
                  fontSize: "16px",
                }}
              >
                Contact Us&nbsp;<i class="fas fa-phone"></i>
              </NavLink>
            </li>
          </ul>
          {userInfo ? (
            <div style={{ display: "flex" }}>
              <LinkContainer to="/cart">
                <Button type="submit" variant="success">
                  <i className="fas fa-shopping-cart"></i>
                </Button>
              </LinkContainer>
              &nbsp;
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                style={{
                  fontFamily: "Rubik, sans-serif",
                  fontSize: "17px",
                }}
              />
              <Dropdown className="font-weight-bold">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="font-weight-bold"
                  style={{
                    fontFamily: "Rubik, sans-serif",
                    fontSize: "16px",
                  }}
                >
                  Hello, {userInfo.name.split(" ")[0]}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    style={{ fontFamily: "Rubik, sans-serif" }}
                    className="text-success"
                    href="/profile"
                  >
                    <i className="fas fa-user"></i> Profile
                  </Dropdown.Item>
                  {/* <Dropdown.Item
                    style={{ fontFamily: "Rubik, sans-serif" }}
                    className="text-success"
                    href="/cart"
                  >
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Dropdown.Item> */}
                  <NavDropdown.Divider />
                  <Dropdown.Item
                    className="text-success"
                    onClick={logoutHandler}
                    style={{ fontFamily: "Rubik, sans-serif" }}
                  >
                    <i class="fas fa-sign-out-alt"></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <>
              <LinkContainer to="/cart">
                <Button type="submit" variant="success">
                  <i className="fas fa-shopping-cart"></i>
                </Button>
              </LinkContainer>
              &nbsp;
              <form class="form-inline my-2 my-lg-0" action="/login">
                <button
                  class="btn btn-outline-success my-2 my-sm-0 text-uppercase font-weight-bold"
                  type="submit"
                >
                  Join Us <i class="fas fa-users"></i>
                </button>
              </form>
            </>
          )}
        </div>
      </Nav>
      <hr
        style={{ borderWidth: "2px", borderColor: "green", marginTop: "0px" }}
      />
    </>
  );
};

export default Navbar;
