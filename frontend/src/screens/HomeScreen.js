import React from "react";
import { Link } from "react-router-dom";
import img1 from "../components/home-image/p2.jpg";
import img2 from "../components/home-image/services2.jpg";
import ImageSlider from "../components/ImageSlider";

const HomeScreen = () => {
  var obj = ["products","services"];
  return (
    <>
      <ImageSlider />
      <div class="wrapper">
        <div class="pic">
          <Link to={`/${obj[0]}`}>
            <img class="image" src={img1} alt="products" />
          </Link>
          <div class="middle">
            <Link
              className="text"
              style={{
                textDecoration: "none",
                fontFamily: "Rubik, sans-serif",
              }}
              to={`/${obj[0]}`}
            >
              PRODUCTS
            </Link>
          </div>
        </div>
        <div class="pic">
          <Link to={`/${obj[1]}`}>
            <img class="image" src={img2} alt="services" />
          </Link>
          <div class="middle">
            <Link
              className="text"
              style={{
                textDecoration: "none",
                fontFamily: "Rubik, sans-serif",
              }}
              to={`/${obj[1]}`}
            >
              SERVICES
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
