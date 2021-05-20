import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Nav,
  NavDropdown,
  Dropdown,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { logout } from "../actions/userActions";
import img from "../images/logo3.png";

const Navbar = ({}) => {
  const [query, setquery] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  const [showUser, setShowUser] = useState(false);
  const showUserDropdown = (e) => {
    setShowUser(!showUser);
  };
  const hideUserDropdown = (e) => {
    setShowUser(false);
  };

  const [showAdmin, setShowAdmin] = useState(false);
  const showAdminDropdown = (e) => {
    setShowAdmin(!showAdmin);
  };
  const hideAdminDropdown = (e) => {
    setShowAdmin(false);
  };

  const history = useHistory();
  const location = useLocation();

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
          fontFamily: "Rubik, sans-serif",
          textShadow: "1px 1px 10px blue, 1px 1px 10px white",
        }}
      >
        <p>GET FLAT 10% OFF ON ALL ORDERS AND BOOKINGS</p>
      </div>

      <Nav id="nav1" class="navbar navbar-expand-lg navbar-light">
        <NavLink
          id="nav-brand"
          class="navbar-brand text-white  ont-weight-bold"
          to="/"
        >
          <img
            className="logo"
            src={img}
            alt="Just in Time Online Watch Store"
            width="150"
            height="60"
          />
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
          <div className="nav-links">
            <NavLink
              className="nav-link text-uppercase font-weight-bold text-success"
              to="/"
              exact
            >
              Home&nbsp;<i class="fas fa-home"></i>
              <span class="sr-only">(current)</span>
            </NavLink>

            <NavLink
              className="nav-link text-uppercase font-weight-bold text-success"
              to="/aboutus"
              exact
            >
              About Us&nbsp;<i class="fas fa-info-circle"></i>
            </NavLink>

            <NavLink
              className="nav-link text-uppercase font-weight-bold text-success"
              to="/contactus"
              exact
            >
              Contact Us&nbsp;<i class="fas fa-phone"></i>
            </NavLink>
          </div>
          {/* NAV-RIGHT-CONTENT */}
          {userInfo ? (
            /* USER */
            <div className="nav-right-content">
              <Dropdown
                style={{
                  fontFamily: "Rubik, sans-serif",
                }}
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <Dropdown.Toggle
                  style={{
                    fontFamily: "Rubik, sans-serif",
                    fontSize: "17px",
                  }}
                  variant="success"
                  id="dropdown-basic"
                >
                  <b>Categories</b>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className="text-success" href="/products">
                    Products
                  </Dropdown.Item>
                  <NavDropdown.Divider />
                  <Dropdown.Item className="text-success" href="/services">
                    Services
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              &emsp;
              <LinkContainer to="/cart">
                <Button type="submit" variant="success" id="cart-button">
                  <i className="fas fa-shopping-cart"></i>
                </Button>
              </LinkContainer>
              &emsp;
              <FormControl
                value={query}
                onChange={(e) => {
                  setquery(e.target.value);
                }}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                // size="sm"
                style={{
                  fontFamily: "Rubik, sans-serif",
                  fontSize: "17px",
                  maxWidth: "100%",
                }}
                id="form-search"
              />
              {query.length == 0 ? (
                <NavLink
                  className="nav-link text-uppercase font-weight-bold text-success"
                  to={location.pathname}
                  exact
                >
                  <i class="fa fa-search" aria-hidden="true"></i>
                </NavLink>
              ) : (
                <NavLink
                  className="nav-link text-uppercase font-weight-bold text-success"
                  to={`/search/${query}`}
                  exact
                >
                  <i class="fa fa-search" aria-hidden="true"></i>
                </NavLink>
              )}
              <Dropdown
                show={showUser}
                onMouseEnter={showUserDropdown}
                onMouseLeave={hideUserDropdown}
                className="font-weight-bold"
              >
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

                  <NavDropdown.Divider />
                  <Dropdown.Item
                    style={{ fontFamily: "Rubik, sans-serif" }}
                    className="text-success"
                    href="/myOrders"
                  >
                    <i className="fas fa-user"></i> My Orders
                  </Dropdown.Item>

                  <NavDropdown.Divider />
                  <Dropdown.Item
                    style={{ fontFamily: "Rubik, sans-serif" }}
                    className="text-success"
                    href="/myBookings"
                  >
                    <i className="fas fa-user"></i> My Bookings
                  </Dropdown.Item>

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
              &emsp;
              {userInfo && userInfo.isAdmin && (
                /* ADMIN */
                <div className="nav-right-content">
                  <Dropdown
                    show={showAdmin}
                    onMouseEnter={showAdminDropdown}
                    onMouseLeave={hideAdminDropdown}
                    className="font-weight-bold"
                  >
                    <Dropdown.Toggle
                      variant="outline-info"
                      id="dropdown-basic"
                      className="font-weight-bold"
                      style={{
                        fontFamily: "Rubik, sans-serif",
                        fontSize: "16px",
                        // marginTop: "-1px",
                      }}
                    >
                      Manage
                    </Dropdown.Toggle>
                    {/* <NavDropdown title="Manage" id="adminmenu"> */}
                    <Dropdown.Menu>
                      <Dropdown.Item
                        style={{ fontFamily: "Rubik, sans-serif" }}
                        href="/admin/userlist"
                      >
                        Users
                      </Dropdown.Item>

                      <NavDropdown.Divider />
                      <Dropdown.Item
                        style={{ fontFamily: "Rubik, sans-serif" }}
                        href="/admin/productlist"
                      >
                        Products
                      </Dropdown.Item>

                      <NavDropdown.Divider />
                      <Dropdown.Item
                        style={{ fontFamily: "Rubik, sans-serif" }}
                        href="/admin/servicelist"
                      >
                        Services
                      </Dropdown.Item>
                      <NavDropdown.Divider />
                      <Dropdown.Item
                        style={{ fontFamily: "Rubik, sans-serif" }}
                        href="/admin/orderlist"
                      >
                        Orders
                      </Dropdown.Item>

                      <NavDropdown.Divider />
                      <Dropdown.Item
                        style={{ fontFamily: "Rubik, sans-serif" }}
                        href="/admin/bookinglist"
                      >
                        Bookings
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                /* ADMIN-END */
              )}
            </div>
          ) : (
            /* NAV-RIGHT-CONTENT-END USER & ADMIN */

            /* COMMON ELEMENTS */
            <div className="nav-right-content">
              <Dropdown
                style={{
                  fontFamily: "Rubik, sans-serif",
                }}
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <Dropdown.Toggle
                  style={{
                    fontFamily: "Rubik, sans-serif",
                    fontSize: "17px",
                  }}
                  variant="success"
                  id="dropdown-basic"
                >
                  <b>Categories</b>
                </Dropdown.Toggle>

                <Dropdown.Menu id="dropdown-basic-menu">
                  <Dropdown.Item className="text-success" href="/products">
                    Products
                  </Dropdown.Item>
                  <NavDropdown.Divider />
                  <Dropdown.Item className="text-success" href="/services">
                    Services
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              &emsp;
              <FormControl
                value={query}
                onChange={(e) => {
                  setquery(e.target.value);
                }}
                type="text"
                placeholder="Search"
                // className="mr-sm-2"
                style={{
                  fontFamily: "Rubik, sans-serif",
                  fontSize: "17px",
                  maxWidth: "50%",
                }}
                id="form-search"
              />
              {query.length == 0 ? (
                <NavLink
                  className="nav-link text-uppercase font-weight-bold text-success"
                  to={location.pathname}
                  exact
                >
                  <i class="fa fa-search" aria-hidden="true"></i>
                </NavLink>
              ) : (
                <NavLink
                  className="nav-link text-uppercase font-weight-bold text-success"
                  to={`/search/${query}`}
                  exact
                >
                  <i class="fa fa-search" aria-hidden="true"></i>
                </NavLink>
              )}
              <LinkContainer to="/cart">
                <Button type="submit" variant="success" id="cart-button">
                  <i className="fas fa-shopping-cart"></i>
                </Button>
              </LinkContainer>
              &emsp;
              <form
                // class="form-inline my-2 my-lg-0"
                action="/login"
              >
                <button
                  // class="btn btn-outline-success my-2 my-sm-0 text-uppercase font-weight-bold"
                  class="btn btn-outline-success text-uppercase font-weight-bold"
                  type="submit"
                  id="form-button"
                >
                  <div id="form-button-para">
                    Join Us <i class="fas fa-users"></i>
                  </div>
                </button>
              </form>
            </div>
            /* COMMON ELEMENTS END */
          )}
          &nbsp;
        </div>
      </Nav>
      <hr
        style={{ borderWidth: "3px", borderColor: "green", marginTop: "0px" }}
      />
    </>
  );
};

export default Navbar;
