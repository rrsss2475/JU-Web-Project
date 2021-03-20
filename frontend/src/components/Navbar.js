import React from 'react';
import AboutusScreen from '../screens/AboutusScreen';
const Navbar = () => {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <a class="navbar-brand text-white font-weight-bold" href="#">JUstInTime</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav m-auto">
      <li class="nav-item active">
        <a class="nav-link text-white text-uppercase font-weight-bold ml-5" href="/">Home&nbsp;<i class="fas fa-home"></i><span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-uppercase font-weight-bold ml-5" href="/aboutus">About Us&nbsp;<i class="fas fa-info-circle"></i></a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-uppercase font-weight-bold ml-5" href="#">Contact Us&nbsp;<i class="fas fa-mobile-alt"></i></a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
      <button class="btn btn-outline-primary my-2 my-sm-0 text-white" type="submit">Sign Up</button>
      &nbsp;
      <button class="btn btn-outline-success my-2 my-sm-0 text-white" type="submit">Login</button>
    </form>
  </div>
</nav>
    );
}

export default Navbar