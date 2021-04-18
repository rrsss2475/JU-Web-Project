import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Form, Button, Toast } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'

const ProductDescScreen = ({ location }) => {
  const { product } = location.state
  const [qty, setqty] = useState(1)
  const [user, setuser] = useState('')
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)
  const { catName, subCatName } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/userName/${product.user}`)
      .then((res) => {
        setuser(res.data.name);
        setloading(false);
      })
      .catch((error) => {
        seterror(error)
      })
  }, [])

  const addToCartHandler = () => { }

  return (
    <div className='container' style={{ paddingTop: '75px' }}>
      <Link className='btn btn-dark my-3 mx-2' to={`/`}>
        Back to Home
      </Link>
      <Link className='btn btn-dark my-3 mx-2' to={`/categories`}>
        Back to Categories
      </Link>
      <Link className='btn btn-dark my-3 mx-2' to={`/categories/${catName}`}>
        Back to {catName}
      </Link>
      <Link
        className='btn btn-dark my-3 mx-2'
        to={`/categories/${catName}/${subCatName}`}
      >
        Back to {subCatName}
      </Link>
      <Row>
        <Col sm={12} md={8} lg={6} xl={6}>
          <img
            src={product.image}
            style={{ height: '100%', width: '100%', maxHeight: '500px' }}
          />
        </Col>
        <Col sm={12} md={8} lg={5} xl={4}>
          <h1>{product.name}</h1>
          {loading ? <Loader size="25" /> : error ? <Message variant="danger">{error}</Message> : `By ${user}`}
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <br />
          <b>Price: Rs {product.price}</b>
          <br />
          {product.isAvailable ? (
            <div style={{ color: 'green', fontWeight: 'bold' }}>In Stock</div>
          ) : (
            <div style={{ color: 'red', fontWeight: 'bold' }}>Out Of Stock</div>
          )}
          <br />
          {product.isAvailable ? (
            <div>
              Qty
              <Form.Control
                as='select'
                value={qty}
                onChange={(e) => setqty(e.target.value)}
              >
                {[...Array(4).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </Form.Control>
              <Button
                onClick={addToCartHandler}
                className='btn-block'
                type='button'
              >
                Add To Cart
              </Button>
            </div>
          ) : (
            <h1></h1>
          )}
          <br />
          <h3>About this item:</h3>
          <p>{product.description}</p>
          <Link
            to={{
              pathname: `/categories/${catName}/${subCatName}/${product._id}/reviews`,
              state: { product: product },
            }}
          >
            <Button className='btn-block' variant='secondary'>
              See all Reviews{' '}
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDescScreen
