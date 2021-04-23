import React, { useEffect } from "react";
import { Nav, NavDropdown, Dropdown, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/userActions";

const Navbar = ({ location, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        style={{
          marginTop: "10px",
          color: "white",
          fontWeight: "700",
          textAlign: "center",
          fontSize: "14px",
          border: "1px solid #000000",
          padding: "10px",
          background: "rgb(0, 168, 0)",
        }}
      >
        GET FLAT 10% OFF ON YOUR FIRST ORDER
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
            src="https://justintime.in/media/logo/stores/1/jitlogo.png"
            alt="Just in Time Online Watch Store"
            width="289"
            height="64"
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
              >
                About Us&nbsp;<i class="fas fa-info-circle"></i>
              </NavLink>
            </li>

            <li class="nav-item">
              <NavLink
                className="nav-link text-uppercase font-weight-bold text-success"
                to="/contactus"
                exact
              >
                Contact Us&nbsp;<i class="fas fa-phone"></i>
              </NavLink>
            </li>
          </ul>
          {userInfo ? (
            // <NavDropdown style={{ color:'white' }} className="text-uppercase font-weight-bold" title={userInfo.name} id='username'>
            //   <NavLink to='/profile' style={{ textDecoration: 'none' }}>
            //     <NavDropdown.Item><i className='fas fa-user'></i> Profile</NavDropdown.Item>
            //   </NavLink>
            //   <NavLink to='/cart' style={{ textDecoration: 'none' }}>
            //     <NavDropdown.Item><i className='fas fa-shopping-cart'></i> Cart</NavDropdown.Item>
            //   </NavLink>
            //   <NavDropdown.Item onClick={logoutHandler}>
            //     Logout
            //   </NavDropdown.Item>
            // </NavDropdown>

            <div style={{ display: "flex" }}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />

              <Dropdown className="text-uppercase font-weight-bold">
                <Dropdown.Toggle
                  variant="outline-success"
                  id="dropdown-basic"
                  className="text-uppercase font-weight-bold"
                >
                  {userInfo.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className="text-success" href="/profile">
                    <i className="fas fa-user"></i> Profile
                  </Dropdown.Item>
                  <Dropdown.Item className="text-success" href="/cart">
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Dropdown.Item>
                  <NavDropdown.Divider />
                  <Dropdown.Item
                    className="text-success"
                    onClick={logoutHandler}
                  >
                    <i class="fas fa-sign-out-alt"></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <form class="form-inline my-2 my-lg-0" action="/login">
              <button
                class="btn btn-outline-success my-2 my-sm-0 text-uppercase font-weight-bold"
                type="submit"
              >
                Join Us <i class="fas fa-users"></i>
              </button>
            </form>
          )}
        </div>
      </Nav>
      <hr style={{ borderWidth: "2px", borderColor: "green" }} />
    </>
  );
};

export default Navbar;
