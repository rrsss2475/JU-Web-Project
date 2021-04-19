import React from "react";
import { Carousel } from "react-bootstrap";

const ImageSlider = () => {
  return (
    <Carousel fade controls={false} pause={false}>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/p.png?alt=media&token=e32814cf-9561-49d7-b2f4-83a510f72761" alt="First slide" />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/p1new.png?alt=media&token=474d7b8a-91b5-4774-89df-c116b29d8c2d" alt="Second slide" />
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/services.png?alt=media&token=c27a6a1e-eb52-4664-9d45-d48977121028" alt="Third slide" />
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/services1.png?alt=media&token=240bde19-c7d7-41eb-9f35-ba163ff6cfd8" alt="Fourth slide" />
        {/* <Carousel.Caption>
          <h3>Fourth slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageSlider;
