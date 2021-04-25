import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listCart } from '../actions/cartActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import img from '../images/baby.jpg'
import QuantitySelector from '../components/QuantitySelector'
import axios from 'axios'

const CartScreen = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cartList = useSelector((state) => state.cartList)
  const { loading, error, cart } = cartList

  const [cartArr, setcartArr] = useState([])

  useEffect(() => {
    dispatch(listCart(userInfo._id))
  }, [dispatch])

  useEffect(() => {
    ;(async function fun() {
      const cartArr1 = []
      for (let i = 0; i < cart.length; i++) {
        const item = await axios.get(
          `http://localhost:5000/api/products/categories/${cart[i].product}`
        )
        //setcartArr(prevState => [...prevState, item.data]);
        cartArr1.push({ ...item.data, qty: cart[i].qty })
      }
      setcartArr(cartArr1)
    })()
  }, [cart])

  /*
    if (!loading && !error) {
        useEffect(() => {
            (async function fun() {
                for (let i = 0; i < cart.length; i++) {
                    const item = await axios.get(`http://localhost:5000/api/products/categories/${cart[i].product}`)
                    console.log(item.data);
                    setcartArr(prevState=>[...prevState,item.data]);
                }
            })();
        }, [cart]);
    }
    */

  const addQtyHandler = (item) => {
    //console.log(cartArr.length)
    axios
      .post('http://localhost:5000/api/users/addToCart', {
        userid: userInfo._id,
        productid: item._id,
        qty: 1,
      })
      .then((res) => {
        let cartArr1 = []
        for (let i in cartArr) {
          cartArr1.push(cartArr[i])
          if (cartArr[i]._id == item._id) cartArr1[i].qty += 1
        }
        setcartArr(cartArr1)
      })
      .catch()
  }

  const subQtyHandler = (item) => {
    axios
      .post('http://localhost:5000/api/users/addToCart', {
        userid: userInfo._id,
        productid: item._id,
        qty: 1,
      })
      .then((res) => {
        let cartArr1 = []
        for (let i in cartArr) {
          cartArr1.push(cartArr[i])
          if (cartArr[i]._id == item._id) cartArr1[i].qty -= 1
        }
        setcartArr(cartArr1)
      })
      .catch()
  }

  const deleteHandler = (item) => {
    let cartArr1 = []
    for (let i in cartArr) {
      if (cartArr[i]._id != item._id) cartArr1.push(cartArr[i])
    }
    setcartArr(cartArr1)
  }

  let body = (
    <div>
      {cartArr.map((item) => (
        <div>
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            <div className='container'>
              <p style={{ lineHeight: '10px' }}>
                <img
                  src={item.image}
                  style={{
                    height: '150px',
                    float: 'left',
                    marginRight: '10px',
                    width: '250px',
                  }}
                ></img>
                <div style={{ fontSize: '40px', marginTop: '20px' }}>
                  {item.name}
                </div>{' '}
                <br />
                <br />
                <br />
                <br />
                <QuantitySelector
                  qty={item.qty}
                  addQtyHandler={() => addQtyHandler(item)}
                  subQtyHandler={() => subQtyHandler(item)}
                  limit={10}
                />
                <br />
                <br />
                <Link onClick={() => deleteHandler(item)}>
                  <i class='fa fa-trash' aria-hidden='true'></i>Delete
                </Link>
              </p>
            </div>
            <br />
          </li>
          <br />
        </div>
      ))}
    </div>
  )

  return (
    <div className='container'>
      <h1>Shopping Cart</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        body
      )}
    </div>
  )
}

export default CartScreen
