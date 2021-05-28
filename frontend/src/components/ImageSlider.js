import React from "react";
import { Carousel } from "react-bootstrap";

const ImageSlider = () => {
  return (
    <div className="carousel">
      <Carousel fade controls={false} pause={false}>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/p.jpg?alt=media&token=aec806ef-5f05-48b6-a5cd-c4702e2040d2"
            alt="First slide"
          />
          {/* <Carousel.Caption>
          <h3>First slide label</h3>
    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/p1new.jpg?alt=media&token=5d0bceaf-5069-414e-b873-6f997458f0be"
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/services.jpg?alt=media&token=d49fb348-54e8-48b0-b838-4df4e188d2d6"
            alt="Third slide"
          />
          {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/services1.jpg?alt=media&token=fd1ee6b6-e128-45c8-9b36-14888451df8f"
            alt="Fourth slide"
          />
          {/* <Carousel.Caption>
          <h3>Fourth slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageSlider;
