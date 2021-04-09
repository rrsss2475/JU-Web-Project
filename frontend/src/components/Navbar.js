import React from 'react';
import { NavLink } from 'react-router-dom';
import AboutusScreen from '../screens/AboutusScreen';

const Navbar = () => {
    return (
    <>
      <nav id="nav1" class="navbar sticky-top navbar-expand-lg navbar-light bg-dark">
  <NavLink class="navbar-brand text-white font-weight-bold" to="/">JUstintime</NavLink>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <NavLink className="nav-link text-white text-uppercase font-weight-bold" to="/" exact>Home&nbsp;<i class="fas fa-home"></i><span class="sr-only">(current)</span></NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link text-white text-uppercase font-weight-bold" to="/aboutus" exact>About Us&nbsp;<i class="fas fa-info-circle"></i></NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link text-white text-uppercase font-weight-bold" to="/contactus" exact>Contact Us&nbsp;<i class="fas fa-mobile-alt"></i></NavLink>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0" action="/signup">
      <button class="btn btn-outline-primary my-2 my-sm-0 text-white font-weight-bold" type="submit" onclick="window.location.href='/signup';">Sign Up</button>
      &nbsp;
      </form>
      <form class="form-inline my-2 my-lg-0" action="/login">
      <button class="btn btn-outline-success my-2 my-sm-0 text-white font-weight-bold" type="submit">Login</button>
    </form>
  </div>
</nav>
</>
    );
}

export default Navbar