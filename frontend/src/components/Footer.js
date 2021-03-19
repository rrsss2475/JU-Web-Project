import React from "react";
import '../App.css'

function Footer() {
  return ( 
    <nav class="navbar fixed-bottom navbar-expand-lg navbar-light bg-secondary" id="nav1">

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav m-auto">
      <li class="nav-item active">
        <a class="nav-link text-uppercase font-weight-bold ml-5" href="#">&copy;{new Date().getFullYear()} All Rights Reserved | JUstInTime<span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>
  );
}

export default Footer;