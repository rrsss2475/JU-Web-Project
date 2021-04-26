import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import { Col, Row, Form, Button, Toast } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import QuantitySelector from '../components/QuantitySelector'
import { productDescAction } from '../actions/productDescActions'
const ProductDescScreen = () => {

  const [qty, setqty] = useState(1)
  const [user, setuser] = useState('')
  const [userloading, setuserloading] = useState(true)
  const [usererror, setusererror] = useState(false)
  const { catName, subCatName, id } = useParams()
  const [redirectToLogin, setredirectToLogin] = useState(false)
  const [addToCartSuccess, setaddToCartSuccess] = useState('')
  const [addToCartErr, setaddToCartErr] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDesc = useSelector((state) => state.productDesc)
  const { loading, error, productDescription } = productDesc
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productDescAction(catName, subCatName, id))
  }, [dispatch])

  useEffect(() => {
    if (loading == false) {
      axios
        .get(`http://localhost:5000/api/products/userName/${productDescription.user}`)
        .then((res) => {
          setuser(res.data.name)
          setuserloading(false)
        })
        .catch((err) => {
          setusererror(err)
        })
    }
  }, [loading])

  const addToCartHandler = () => {
    if (userInfo == null) {
      setredirectToLogin(true)
      return;
    }
    else {
      axios
        .post('http://localhost:5000/api/users/addToCart', {
          userid: userInfo._id,
          productid: productDescription._id,
          qty: qty,
        })
        .then(res => {
          setqty(1);
          setaddToCartSuccess(res)
        })
        .catch(err => {
          setqty(1);
          setaddToCartErr(err)
        })
    }
  }

  const addQtyHandler = () => {
    setqty(qty + 1)
  }
  const subQtyHandler = () => {
    setqty(qty - 1)
  }

  let body = (
    <div className='container' style={{ paddingTop: '75px' }}>
      {redirectToLogin ? (
        <Redirect
          to={{
            pathname: '/login',
            search: `?redirect=/categories/${catName}/${subCatName}/${productDescription._id}`,
          }}
        />
      ) : (
        <div></div>
      )}

      <Toast style={{ color: "red", backgroundColor: "pink" }} show={addToCartErr.length != 0} onClose={() => { setaddToCartErr('') }} delay={3000} autohide >
        <Toast.Header>
          <strong className="mr-auto">Error:</strong>
        </Toast.Header>
        <Toast.Body>Purchase Limit Exceeded!</Toast.Body>
      </Toast>

      <Toast style={{ color: "green", backgroundColor: "lightgreen" }} show={addToCartSuccess.length != 0} onClose={() => { setaddToCartSuccess('') }} delay={3000} autohide >
        <Toast.Header>
          <strong className="mr-auto">Success:</strong>
        </Toast.Header>
        <Toast.Body>Added to cart successfully!</Toast.Body>
      </Toast>

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
            src={productDescription.image}
            style={{ height: '100%', width: '100%', maxHeight: '500px' }}
          />
        </Col>
        <Col sm={12} md={8} lg={5} xl={4}>
          <h1>{productDescription.name}</h1>
          {userloading ? (
            <Loader size='25' />
          ) : usererror ? (
            <Message variant='danger'>{usererror}</Message>
          ) : (
            `By ${user}`
          )}
          <Rating
            value={productDescription.rating}
            text={`${productDescription.numReviews} reviews`}
          />
          <br />
          <b>Price: Rs {productDescription.price}</b>
          <br />
          {productDescription.isAvailable ? (
            <div style={{ color: 'green', fontWeight: 'bold' }}>In Stock</div>
          ) : (
            <div style={{ color: 'red', fontWeight: 'bold' }}>Out Of Stock</div>
          )}
          <br />
          {productDescription.isAvailable ? (
            <div>
              <QuantitySelector
                qty={qty}
                addQtyHandler={addQtyHandler}
                subQtyHandler={subQtyHandler}
                limit={10}
              />
              <br />
              <Button
                style={{ paddingLeft: '50px', paddingRight: '50px' }}
                onClick={addToCartHandler}
              >
                Add To Cart
              </Button>
            </div>
          ) : (
            <h1></h1>
          )}
          <br />
          <h3>About this item:</h3>
          <p>{productDescription.description}</p>
          <Link
            to={{
              pathname: `/categories/${catName}/${subCatName}/${productDescription._id}/reviews`,
              state: { productDescription: productDescription },
            }}
          >
            <Button className='btn-block' variant='secondary'>
              See all Reviews{' '}
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );

  return (
    loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : body
  )
}

export default ProductDescScreen
