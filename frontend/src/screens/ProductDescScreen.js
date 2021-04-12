import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Rating from '../components/Rating'

const ProductDescScreen = ({ location }) => {
  const { product } = location.state
  //const { product } = state;
  console.log(product)
  return (
    <div className='container' style={{ paddingTop: '75px' }}>
      <Row>
        <Col sm={12} md={8} lg={6} xl={6}>
          <img src={product.image} style={{ height: '100%', width: '100%' }} />
        </Col>
        <Col sm={12} md={8} lg={5} xl={4}>
          <h1>{product.name}</h1>
          By {product.user}
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <br />
          <p>
            <b>Price: Rs {product.price}</b>
          </p>
          <br />
          <br />
          
          <p>{product.description}</p>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDescScreen
