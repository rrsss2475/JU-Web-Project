import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listCart } from '../actions/cartActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import QuantitySelector from '../components/QuantitySelector'
import axios from 'axios'

const CartScreen = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cartList = useSelector((state) => state.cartList)
  const { loading, error, cart } = cartList

  const [cartArr, setcartArr] = useState([])

  const [amount, setamount] = useState(0)

  useEffect(() => {
    if (userInfo != null) dispatch(listCart(userInfo._id))
  }, [dispatch])

  useEffect(() => {
    ;(async function fun() {
      const cartArr1 = []
      let amt = 0
      for (let i = 0; i < cart.length; i++) {
        const item = await axios.get(
          `http://localhost:5000/api/products/categories/${cart[i].product}`
        )
        //setcartArr(prevState => [...prevState, item.data]);
        cartArr1.push({
          ...item.data,
          qty: cart[i].qty,
          weight: cart[i].weight,
        })
        amt += cartArr1[i].isWeighted
          ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
          : cartArr1[i].price * cartArr1[i].qty
      }
      console.log(amt)
      setcartArr(cartArr1)
      setamount(amt)
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
    if (!item.isWeighted)
      axios
        .post('http://localhost:5000/api/users/addToCart', {
          userid: userInfo._id,
          productid: item._id,
          qty: 1,
        })
        .then((res) => {
          let cartArr1 = []
          let amt = 0
          for (let i in cartArr) {
            cartArr1.push(cartArr[i])
            if (cartArr[i]._id == item._id) {
              //cartArr1[i].qty += 1;
              cartArr1[i].qty = res.data[i].qty
            }
            amt += cartArr1[i].isWeighted
              ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
              : cartArr1[i].price * cartArr1[i].qty
          }
          setcartArr(cartArr1)
          setamount(amt)
        })
        .catch()
    else
      axios
        .post('http://localhost:5000/api/users/addToCart', {
          userid: userInfo._id,
          productid: item._id,
          weight: item.weight,
          qty: 1,
        })
        .then((res) => {
          let cartArr1 = []
          let amt = 0
          for (let i in cartArr) {
            cartArr1.push(cartArr[i])
            if (
              cartArr[i]._id == item._id &&
              cartArr[i].weight == item.weight
            ) {
              //cartArr1[i].qty += 1;
              cartArr1[i].qty = res.data[i].qty
            }
            amt += cartArr1[i].isWeighted
              ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
              : cartArr1[i].price * cartArr1[i].qty
          }
          setcartArr(cartArr1)
          setamount(amt)
        })
        .catch()
  }

  const subQtyHandler = (item) => {
    if (!item.isWeighted)
      axios
        .post('http://localhost:5000/api/users/addToCart', {
          userid: userInfo._id,
          productid: item._id,
          qty: -1,
        })
        .then((res) => {
          let cartArr1 = []
          let amt = 0
          for (let i in cartArr) {
            cartArr1.push(cartArr[i])
            if (cartArr[i]._id == item._id) {
              //cartArr1[i].qty -= 1;
              cartArr1[i].qty = res.data[i].qty
            }
            amt += cartArr1[i].isWeighted
              ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
              : cartArr1[i].price * cartArr1[i].qty
          }
          setcartArr(cartArr1)
          setamount(amt)
        })
        .catch()
    else
      axios
        .post('http://localhost:5000/api/users/addToCart', {
          userid: userInfo._id,
          productid: item._id,
          weight: item.weight,
          qty: -1,
        })
        .then((res) => {
          let cartArr1 = []
          let amt = 0
          for (let i in cartArr) {
            cartArr1.push(cartArr[i])
            if (
              cartArr[i]._id == item._id &&
              cartArr[i].weight == item.weight
            ) {
              //cartArr1[i].qty -= 1;
              cartArr1[i].qty = res.data[i].qty
            }
            amt += cartArr1[i].isWeighted
              ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
              : cartArr1[i].price * cartArr1[i].qty
          }
          setcartArr(cartArr1)
          setamount(amt)
        })
        .catch()
  }

  const deleteHandler = (item) => {
    if (!item.isWeighted)
      axios
        .post('http://localhost:5000/api/users/deleteFromCart', {
          userid: userInfo._id,
          productid: item._id,
        })
        .then((res) => {
          let cartArr1 = []
          let amt = 0
          for (let i in cartArr) {
            if (cartArr[i]._id != item._id) {
              cartArr1.push(cartArr[i])
              amt += (cartArr1[i].isWeighted) ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight: cartArr1[i].price * cartArr1[i].qty 
            }
          }
          setcartArr(cartArr1)
          setamount(amt)
        })
        .catch()
    else
      axios
        .post('http://localhost:5000/api/users/deleteFromCart', {
          userid: userInfo._id,
          productid: item._id,
          weight: item.weight,
        })
        .then((res) => {
          let cartArr1 = []
          let amt = 0

          for (let i in cartArr) {
            if (cartArr[i]._id == item._id && cartArr[i].weight == item.weight)
              continue
            cartArr1.push(cartArr[i])
            let x = cartArr1.length-1
            amt += (cartArr1[x].isWeighted) ? cartArr1[x].price * cartArr1[x].qty * cartArr1[x].weight: cartArr1[x].price * cartArr1[x].qty 
          }
          setcartArr(cartArr1)
          setamount(amt)
        })
        .catch()
  }

  let body = (
    <div style={{ fontSize: '25px' }}>
      <Link to='/login'>Login</Link> to view your cart
    </div>
  )

  if (userInfo != null) {
    if (cartArr.length == 0) {
      body = (
        <div>
          <h3>Your Shopping Cart is Empty</h3>
        </div>
      )
    } else {
      body = (
        <div>
          <div
            style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '25px' }}
          >
            Subtotal:  <i style={{marginLeft: '10px'}} class='fas fa-rupee-sign'>{amount}</i>
          </div>
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
                        width: '200px',
                      }}
                    ></img>
                    <div style={{ fontSize: '40px', marginTop: '20px' }}>
                      {item.isWeighted ? (
                        <div>
                          {item.name}({item.weight * 1000}grams)
                        </div>
                      ) : (
                        <div>{item.name}</div>
                      )}
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
                <div style={{ fontSize: '20px' }}>
                  <i class='fas fa-rupee-sign'>
                    {item.isWeighted
                      ? item.price * item.weight * item.qty
                      : item.price * item.qty}
                  </i>
                </div>
                <br />
              </li>
              <br />
            </div>
          ))}
        </div>
      )
    }
  }
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
