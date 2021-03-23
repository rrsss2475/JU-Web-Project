import React from 'react';
import { Carousel } from 'react-bootstrap'
import img1 from './home-image/p.png';
import img2 from './home-image/p1new.png';
import img3 from './home-image/services.png';
import img4 from './home-image/services1.png';

const ImageSlider = () => {
    return (
<Carousel fade controls={false} pause={false}>
<Carousel.Item interval={2000}>
  <img
    className="d-block w-100"
    src={img1}
    alt="First slide"
  />
  <Carousel.Caption>
    <h3>First slide label</h3>
    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item interval={2000}>
  <img
    className="d-block w-100"
    src={img2}
    alt="Second slide"
  />
</Carousel.Item>
<Carousel.Item interval={2000}>
  <img
    className="d-block w-100"
    src={img3}
    alt="Third slide"
  />
  <Carousel.Caption>
    <h3>Third slide label</h3>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item interval={2000}>
  <img
    className="d-block w-100"
    src={img4}
    alt="Fourth slide"
  />
  <Carousel.Caption>
    <h3>Fourth slide label</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </Carousel.Caption>
</Carousel.Item>
</Carousel>
    );
}

export default ImageSlider