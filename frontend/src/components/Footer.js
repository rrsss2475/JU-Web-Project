import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container>
        <div className="footer_info">
          <div className="footer_width about">
            <h3 style={{ fontFamily: "Rubik, sans-serif" }}>About</h3>
            <p style={{ fontFamily: "Rubik, sans-serif" }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis
              dolorum esse et culpa itaque nostrum accusantium sequi
              praesentium. Consequuntur eaque ducimus nam facilis et blanditiis
              sequi quisquam consequatur nihil voluptatum.
            </p>
          </div>
          <div className="footer_width link">
            <h3 style={{ fontFamily: "Rubik, sans-serif" }}>Quick Links</h3>
            <div className="footer_quick_links">
              <p>
                <a href="/">HOME&emsp;</a>
              </p>
              <p>
                <a href="/aboutus">ABOUT US&emsp;</a>
              </p>
              <p>
                <a href="/contactus">CONTACT US&emsp;</a>
              </p>
            </div>
          </div>
          <div className="footer_width contact">
            <h3 style={{ fontFamily: "Rubik, sans-serif" }}>Contact</h3>
            <div className="footer_links">
              <p>
                <i class="fas fa-map-marker-alt"></i> Jadavpur University SL
                Campus, LB-Block, Salt Lake, Kolkata
              </p>
              <p>
                <a href="mailto:helpdeskjustintime@gmail.com">
                  <i class="far fa-envelope"></i> helpdeskjustintime@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
      <div className="copy-right">
        <p style={{ marginTop: "15px", fontFamily: "Rubik, sans-serif" }}>
          &copy; COPYRIGHT 2021 | @JUstintime | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
