import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer_info">
        <div className="footer_width about">
          <h3 style={{ fontFamily: "Rubik, sans-serif" }}>About</h3>
          <p style={{ fontFamily: "Rubik, sans-serif" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis
            dolorum esse et culpa itaque nostrum accusantium sequi praesentium.
            Consequuntur eaque ducimus nam facilis et blanditiis sequi quisquam
            consequatur nihil voluptatum.
          </p>
          <div className="social-link">
            <ul>
              <li>
                <a href="#">
                  <i class="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer_width link">
          <h3 style={{ fontFamily: "Rubik, sans-serif" }}>Quick Links</h3>
          <ul>
            <li>
              <NavLink style={{ fontFamily: "Rubik, sans-serif" }} to="/">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                style={{ fontFamily: "Rubik, sans-serif" }}
                to="/aboutus"
              >
                ABOUT US
              </NavLink>
            </li>
            <li>
              <NavLink
                style={{ fontFamily: "Rubik, sans-serif" }}
                to="/contactus"
              >
                CONTACT US
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="footer_width contact">
          <h3 style={{ fontFamily: "Rubik, sans-serif" }}>Contact</h3>
          <ul>
            <li>
              <span>
                <i class="fas fa-map-marker-alt"></i>
              </span>
              <p style={{ fontFamily: "Rubik, sans-serif" }}>
                Jadavpur University SL Campus, LB-Block, Salt Lake, Kolkata
              </p>
            </li>
            <li>
              <span>
                <i class="far fa-envelope"></i>
              </span>
              <a href="#" style={{ fontFamily: "Rubik, sans-serif" }}>
                helpdeskjustintime@gmail.com
              </a>
            </li>
            <li>
              <span>
                <i class="fas fa-phone-volume"></i>
              </span>
              <a href="#" style={{ fontFamily: "Rubik, sans-serif" }}>
                66666-99999
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copy-right">
        <p style={{ marginTop: "15px", fontFamily: "Rubik, sans-serif" }}>
          &copy; COPYRIGHT 2021 | @JUstintime | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
