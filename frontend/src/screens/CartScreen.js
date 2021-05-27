import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCart } from "../actions/cartActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import QuantitySelector from "../components/QuantitySelector";
import axios from "axios";
import { Button, Col, ListGroup, Card } from "react-bootstrap";
import { saveOrderItems } from "../actions/orderActions";

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { loading, error, cartItems } = cart;

  const [cartArr, setcartArr] = useState([]);

  const [amount, setamount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (userInfo != null) dispatch(listCart(userInfo._id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    (async function fun() {
      const cartArr1 = [];
      var amt = 0;
      var total = 0;
      for (var i = 0; i < cartItems.length; i++) {
        const item = await axios.get(
          `/api/products/categories/${cartItems[i].product}`
        );
        //setcartArr(prevState => [...prevState, item.data]);
        cartArr1.push({
          ...item.data,
          qty: cartItems[i].qty,
          weight: cartItems[i].weight,
        });
        amt += cartArr1[i].isWeighted
          ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
          : cartArr1[i].price * cartArr1[i].qty;
        total += cartArr1[i].qty;
      }
      //console.log(amt)
      setcartArr(cartArr1);
      setamount(amt);
      setTotalItems(total);
    })();
  }, [cartItems]);

  /*
      if (!loading && !error) {
          useEffect(() => {
              (async function fun() {
                  for (let i = 0; i < cart.length; i++) {
                      const item = await axios.get(`/api/products/categories/${cart[i].product}`)
                      console.log(item.data);
                      setcartArr(prevState=>[...prevState,item.data]);
                  }
              })();
          }, [cart]);
      }
      */

  const checkoutHandler = () => {
    dispatch(saveOrderItems(userInfo));
    history.push("/checkout/products/shipping");
  };

  const addQtyHandler = (item) => {
    //console.log(cartArr.length)
    if (!item.isWeighted)
      axios
        .post("/api/users/addToCart", {
          userid: userInfo._id,
          productid: item._id,
          qty: 1,
        })
        .then((res) => {
          let cartArr1 = [];
          let amt = 0;
          var total = 0;
          for (let i in cartArr) {
            cartArr1.push(cartArr[i]);
            if (cartArr[i]._id === item._id) {
              //cartArr1[i].qty += 1;
              cartArr1[i].qty = res.data[i].qty;
            }
            amt += cartArr1[i].isWeighted
              ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
              : cartArr1[i].price * cartArr1[i].qty;
            total += cartArr1[i].qty;
          }
          setcartArr(cartArr1);
          setamount(amt);
          setTotalItems(total);
        })
        .catch();
    else
      axios
        .post("/api/users/addToCart", {
          userid: userInfo._id,
          productid: item._id,
          weight: item.weight,
          qty: 1,
        })
        .then((res) => {
          let cartArr1 = [];
          let amt = 0;
          var total = 0;
          for (let i in cartArr) {
            cartArr1.push(cartArr[i]);
            if (
              cartArr[i]._id === item._id &&
              cartArr[i].weight === item.weight
            ) {
              //cartArr1[i].qty += 1;
              cartArr1[i].qty = res.data[i].qty;
            }
            amt += cartArr1[i].isWeighted
              ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
              : cartArr1[i].price * cartArr1[i].qty;
            total += cartArr1[i].qty;
          }
          setcartArr(cartArr1);
          setamount(amt);
          setTotalItems(total);
        })
        .catch();
  };

  const subQtyHandler = (item) => {
    if (!item.isWeighted)
      axios
        .post("/api/users/addToCart", {
          userid: userInfo._id,
          productid: item._id,
          qty: -1,
        })
        .then((res) => {
          let cartArr1 = [];
          let amt = 0;
          var total = 0;
          for (let i in cartArr) {
            cartArr1.push(cartArr[i]);
            if (cartArr[i]._id === item._id) {
              //cartArr1[i].qty -= 1;
              cartArr1[i].qty = res.data[i].qty;
            }
            amt += cartArr1[i].isWeighted
              ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
              : cartArr1[i].price * cartArr1[i].qty;
            total += cartArr1[i].qty;
          }
          setcartArr(cartArr1);
          setamount(amt);
          setTotalItems(total);
        })
        .catch();
    else
      axios
        .post("/api/users/addToCart", {
          userid: userInfo._id,
          productid: item._id,
          weight: item.weight,
          qty: -1,
        })
        .then((res) => {
          let cartArr1 = [];
          let amt = 0;
          var total = 0;
          for (let i in cartArr) {
            cartArr1.push(cartArr[i]);
            if (
              cartArr[i]._id === item._id &&
              cartArr[i].weight === item.weight
            ) {
              //cartArr1[i].qty -= 1;
              cartArr1[i].qty = res.data[i].qty;
            }
            amt += cartArr1[i].isWeighted
              ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
              : cartArr1[i].price * cartArr1[i].qty;


            total += cartArr1[i].qty;
          }
          setcartArr(cartArr1);
          setamount(amt);
          setTotalItems(total);
        })
        .catch();
  };

  const deleteHandler = (item) => {
    if (!item.isWeighted)
      axios
        .post("/api/users/deleteFromCart", {
          userid: userInfo._id,
          productid: item._id,
        })
        .then((res) => {
          let cartArr1 = [];
          let amt = 0;
          var total = 0;
          for (let i in cartArr) {
            if (cartArr[i]._id !== item._id) {
              cartArr1.push(cartArr[i]);
              amt += cartArr1[i].isWeighted
                ? cartArr1[i].price * cartArr1[i].qty * cartArr1[i].weight
                : cartArr1[i].price * cartArr1[i].qty;
              total += cartArr1[i].qty;
            }
          }
          setcartArr(cartArr1);
          setamount(amt);
          setTotalItems(total);
        })
        .catch();
    else
      axios
        .post("/api/users/deleteFromCart", {
          userid: userInfo._id,
          productid: item._id,
          weight: item.weight,
        })
        .then((res) => {
          let cartArr1 = [];
          let amt = 0;
          var total = 0;
          for (let i in cartArr) {
            if (
              cartArr[i]._id === item._id &&
              cartArr[i].weight === item.weight
            )
              continue;
            cartArr1.push(cartArr[i]);
            let x = cartArr1.length - 1;
            amt += cartArr1[x].isWeighted
              ? cartArr1[x].price * cartArr1[x].qty * cartArr1[x].weight
              : cartArr1[x].price * cartArr1[x].qty;
            total += cartArr1[x].qty;
          }
          setcartArr(cartArr1);
          setamount(amt);
          setTotalItems(total);
        })
        .catch();
  };


  let body = (
    <div
      style={{
        fontSize: "25px",
      }}
    >
      <form
        // class="form-inline my-2 my-lg-0"
        action="/login"
      >
        <center>
          <button
            // class="btn btn-outline-success my-2 my-sm-0 text-uppercase font-weight-bold"
            class="btn btn-lg btn-outline-success text-uppercase font-weight-bold"
            type="submit"
            id="form-button"
          >
            <div style={{ padding: "5px" }}>Login to view Cart</div>
          </button>
        </center>
      </form>
    </div>
  );

  if (userInfo != null) {
    if (cartItems.length === 0) {
      body = (
        <div>
          <h3> Your Shopping Cart is Empty </h3>
        </div>
      );
    } else {
      if(totalItems===0)
      body=<Loader />
      else
      body = (
        <div style={{ marginTop: "50px" }}>
          {cartArr.map((item) => (
            <div>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div style={{ marginTop: "10px" }} className="container">
                  {/* <p
                    style={{
                      lineHeight: "10px",
                    }}
                  > */}
                  <Link
                    to={`/products/${item.category.name}/${item.subCategory.name}/${item._id}`}
                  >
                    <img
                      src={item.image}
                      style={{
                        height: "180px",
                        float: "left",
                        marginRight: "10px",
                        width: "180px",
                      }}
                      alt={item.name}
                    ></img>
                  </Link>

                  <div
                    className="cartItem"
                    style={{
                      fontSize: "20px",
                      //   marginTop: "20px",
                    }}
                  >
                    {item.isWeighted ? (
                      <div>
                        <strong>
                          {item.name}&nbsp;({item.weight * 1000}
                          grams)
                        </strong>
                      </div>
                    ) : (
                      <div> {item.name} </div>
                    )}
                  </div>
                  <br />
                  <QuantitySelector
                    qty={item.qty}
                    addQtyHandler={() => addQtyHandler(item)}
                    subQtyHandler={() => subQtyHandler(item)}
                    limit={10}
                  />
                  <br />
                  <Link onClick={() => deleteHandler(item)}>
                    <strong>
                      <i class="fa fa-trash" aria-hidden="true"></i>
                      &nbsp;Delete
                    </strong>
                  </Link>
                  {/* </p>{" "} */}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  <i class="fas fa-rupee-sign">
                    &nbsp;
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
          <Col>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>Total Items : {totalItems}</h3>
                  <h3>
                    Subtotal :
                    <i
                      style={{
                        marginLeft: "10px",
                      }}
                      class="fas fa-rupee-sign"
                    >
                      &nbsp;{amount}
                    </i>
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    variant="warning"
                    type="button"
                    className="btn-block"
                    // disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    style={{ fontSize: "18px" }}
                  >
                    <strong> Proceed To Checkout </strong>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </div>
      );
    }
  }
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginTop: "30px" }}>Shopping Cart</h1>
      {loading? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        body
      )}
    </div>
  );
};

export default CartScreen;
