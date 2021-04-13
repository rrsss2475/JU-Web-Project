import React from "react";
// import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/userActions";
// import AboutusScreen from '../screens/AboutusScreen';

const Navbar = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav
        id="nav1"
        class="navbar sticky-top navbar-expand-lg navbar-light bg-dark"
      >
        <NavLink
          id="nav-brand"
          class="navbar-brand text-white font-weight-bold"
          to="/"
        >
          JUstintime
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
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <NavLink
                className="nav-link text-white text-uppercase font-weight-bold"
                to="/"
                exact
              >
                Home&nbsp;<i class="fas fa-home"></i>
                <span class="sr-only">(current)</span>
              </NavLink>
            </li>

            <li class="nav-item">
              <NavLink
                className="nav-link text-white text-uppercase font-weight-bold"
                to="/aboutus"
                exact
              >
                About Us&nbsp;<i class="fas fa-info-circle"></i>
              </NavLink>
            </li>

            <li class="nav-item">
              <NavLink
                className="nav-link text-white text-uppercase font-weight-bold"
                to="/contactus"
                exact
              >
                Contact Us&nbsp;<i class="fas fa-mobile-alt"></i>
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

            <Dropdown className="text-uppercase font-weight-bold">
              <Dropdown.Toggle
                variant="outline-success"
                id="dropdown-basic"
                className="text-white text-uppercase font-weight-bold"
              >
                {userInfo.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/profile">
                  <i className="fas fa-user"></i> Profile
                </Dropdown.Item>
                <Dropdown.Item href="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Dropdown.Item>
                <NavDropdown.Divider />
                <Dropdown.Item onClick={logoutHandler}>
                  <i class="fas fa-sign-out-alt"></i> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <form class="form-inline my-2 my-lg-0" action="/login">
              <button
                class="btn btn-outline-success my-2 my-sm-0 text-white font-weight-bold"
                type="submit"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
