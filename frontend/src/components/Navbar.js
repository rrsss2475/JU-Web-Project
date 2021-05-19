import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Nav,
  NavDropdown,
  Dropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";
import img from "../images/logo3.png";

const Navbar = ({}) => {
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
          // background: "rgb(0, 168, 0)",
          // fontFamily: "Kaushan Script",
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
                  <b>Browse by, Categories</b>
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
              &nbsp;
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
            </div>
          ) : (
            <>
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
                  <b>Browse by, Categories</b>
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
              &nbsp;
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
          &nbsp;
          {userInfo && userInfo.isAdmin && (
            <div style={{ display: "flex" }}>
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
                    marginTop: "-1px",
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
                {/* <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/admin/bookinglist">
                <NavDropdown.Item>Bookings</NavDropdown.Item>
              </LinkContainer> */}
                {/* </NavDropdown> */}
              </Dropdown>
            </div>
          )}
        </div>
      </Nav>
      <hr
        style={{ borderWidth: "3px", borderColor: "green", marginTop: "0px" }}
      />
    </>
  );
};

export default Navbar;
