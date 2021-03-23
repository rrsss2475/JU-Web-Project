import React from "react";
import { NavLink } from 'react-router-dom';

function Footer() {
  return ( 
    <footer>
      <div className="footer_info">
        <div className="footer_width about">
          <h3>About</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis dolorum esse et culpa itaque nostrum accusantium sequi praesentium. 
            Consequuntur eaque ducimus nam facilis et blanditiis sequi quisquam consequatur nihil voluptatum.
          </p>
          <div className="social-link">
            <ul>
              <li><a href="#"><i class="fab fa-facebook"></i></a></li>
              <li><a href="#"><i class="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
        <div className="footer_width link">
          <h3>Quick Links</h3>
          <ul>
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/aboutus">ABOUT US</NavLink></li>
            <li><NavLink to="/contactus">CONTACT US</NavLink></li>
          </ul>
        </div>
        <div className="footer_width contact">
          <h3>Contact</h3>
          <ul>
            <li>
              <span><i class="fas fa-map-marker-alt"></i></span>
              <p>
                833 Mayflower Ave, GD-700106, Street No. 3A, Rajarhat.
              </p>
            </li>
            <li>
              <span><i class="far fa-envelope"></i></span>
              <a href="#">justintime@gmail.com</a>
            </li>
            <li>
              <span><i class="fas fa-phone-volume"></i></span>
              <a href="#">66666-99999</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copy-right">
        <p>
          &copy; COPYRIGHT 2021 | @JUstintime | All Rights Reserved 
        </p>
      </div>
    </footer>
  );
}

export default Footer;