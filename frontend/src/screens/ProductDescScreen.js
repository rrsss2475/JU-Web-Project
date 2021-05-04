import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { Col, Row, Form, Button, Toast } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import QuantitySelector from "../components/QuantitySelector";
import { productDescAction } from "../actions/productActions";
import { serviceDescAction } from "../actions/serviceActions"
const ProductDescScreen = () => {
  const [qty, setqty] = useState(1);
  const [user, setuser] = useState("");
  const [userloading, setuserloading] = useState(true);
  const [usererror, setusererror] = useState(false);
  const { type, catName, subCatName, id } = useParams();
  const [redirectToLogin, setredirectToLogin] = useState(false);
  const [addToCartSuccess, setaddToCartSuccess] = useState("");
  const [addToCartErr, setaddToCartErr] = useState("");
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState(new Date());

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDesc = useSelector((state) => state.productDesc);
  const { loading, error, productDescription } = productDesc;
  const dispatch = useDispatch();
  useEffect(() => {
    if(type == "products")
    dispatch(productDescAction(catName, subCatName, id));
    else 
    dispatch(serviceDescAction(catName, subCatName, id));
  }, [dispatch]);

  useEffect(() => {
    if (loading == false) {
      if(type == "products")  {
      axios
        .get(
          `http://localhost:5000/api/products/userName/${productDescription.user}`
        )
        .then((res) => {
          setuser(res.data.name);
          setuserloading(false);
        })
        .catch((err) => {
          setusererror(err);
        });
      }
      else {
        axios
        .get(
          `http://localhost:5000/api/services/userName/${productDescription.user}`
        )
        .then((res) => {
          setuser(res.data.name);
          setuserloading(false);
        })
        .catch((err) => {
          setusererror(err);
        });
      }
      if (productDescription.isWeighted)
        setWeight(productDescription.weights[0]);
    }
  }, [loading]);

  const addToCartHandler = () => {
    if (userInfo == null) {
      setredirectToLogin(true);
      return;
    } else {
      if (productDescription.isWeighted) {
        axios
          .post("http://localhost:5000/api/users/addToCart", {
            userid: userInfo._id,
            productid: productDescription._id,
            qty: qty,
            weight: weight,
          })
          .then((res) => {
            setqty(1);
            setaddToCartSuccess(res);
          })
          .catch((err) => {
            setqty(1);
            setaddToCartErr(err);
          });
      } else {
        axios
          .post("http://localhost:5000/api/users/addToCart", {
            userid: userInfo._id,
            productid: productDescription._id,
            qty: qty,
          })
          .then((res) => {
            setqty(1);
            setaddToCartSuccess(res);
          })
          .catch((err) => {
            setqty(1);
            setaddToCartErr(err);
          });
      }
    }
  };

  const addQtyHandler = () => {
    setqty(qty + 1);
  };
  const subQtyHandler = () => {
    setqty(qty - 1);
  };

  let body = (
    <div className="container" style={{ marginTop: "50px" }}>
      {redirectToLogin ? (
        <Redirect
          to={{
            pathname: "/login",
            search: `?redirect=/categories/${catName}/${subCatName}/${productDescription._id}`,
          }}
        />
      ) : (
        <div></div>
      )}

      {/* <Toast
        style={{ color: "red", backgroundColor: "pink" }}
        show={addToCartErr.length != 0}
        onClose={() => {
          setaddToCartErr("");
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Error:</strong>
        </Toast.Header>
        <Toast.Body>Purchase Limit Exceeded!</Toast.Body>
      </Toast>

      <Toast
        style={{ color: "green", backgroundColor: "lightgreen" }}
        show={addToCartSuccess.length != 0}
        onClose={() => {
          setaddToCartSuccess("");
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success:</strong>
        </Toast.Header>
        <Toast.Body>Added to cart successfully!</Toast.Body>
      </Toast> */}

      <Link
        style={{ fontFamily: "Rubik, sans-serif" }}
        className="btn btn-success my-3 mx-2"
        to={`/`}
      >
        <strong>Back to Home</strong>
      </Link>
      <strong style={{ color: "green" }}>&gt;</strong>
      <Link
        style={{ fontFamily: "Rubik, sans-serif" }}
        className="btn btn-success my-3 mx-2"
        to={`/${type}`}
      >
        <strong>Back to Categories</strong>
      </Link>
      <strong style={{ color: "green" }}>&gt;</strong>
      <Link
        style={{ fontFamily: "Rubik, sans-serif" }}
        className="btn btn-success my-3 mx-2"
        to={`/${type}/${catName}`}
      >
        <strong>Back to {catName}</strong>
      </Link>
      <strong style={{ color: "green" }}>&gt;</strong>
      <Link
        style={{ fontFamily: "Rubik, sans-serif" }}
        className="btn btn-warning my-3 mx-2"
        to={`/${type}/${catName}/${subCatName}`}
      >
        <strong>Back to {subCatName}</strong>
      </Link>
      <Row style={{ marginTop: "50px" }}>
        <Col sm={12} md={8} lg={6} xl={6}>
          <img
            src={productDescription.image}
            style={{ height: "100%", width: "100%", maxHeight: "500px" }}
          />
        </Col>
        <Col sm={12} md={8} lg={5} xl={4}>
          <h1>{productDescription.name}</h1>
          {userloading ? (
            <Loader size="25" />
          ) : usererror ? (
            <Message variant="danger">{usererror}</Message>
          ) : (
            `By ${user}`
          )}
          <Rating
            value={productDescription.rating}
            text={`${productDescription.numReviews} reviews`}
          />
          <br />
          {productDescription.isWeighted ? (<b>Price: Rs {productDescription.price * weight}</b>):
          (<b>Price: Rs {productDescription.price}</b>)}
          
          <br />
          {type == "products" ? (productDescription.isAvailable ? (
            <div style={{ color: "green", fontWeight: "bold" }}>In Stock</div>
          ) : (
            <div style={{ color: "red", fontWeight: "bold" }}>Out Of Stock</div>
          )) : (productDescription.isAvailable ? (
            <div style={{ color: "green", fontWeight: "bold" }}>Available</div>
          ) : (
            <div style={{ color: "red", fontWeight: "bold" }}>Not Available</div>
          )
          
          )}
          <br />
          {type == "services" ? (
            <DatePicker
            selected={date}
            onChange={date => setDate(date)}
          />
          ) : 
          <div></div>}
          {productDescription.isWeighted ? (
            <div>
              <select
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{ fontSize: "20px", border: "solid black" }}
              >
                {productDescription.weights.map((wt) => {
                  return <option value={wt}>{wt * 1000}</option>;
                })}
              </select>
              &nbsp;grams
            </div>
          ) : (
            <div></div>
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
                variant="warning"
                // style={{ paddingLeft: "130px", paddingRight: "130px" }}
                style={{ width: "100%" }}
                onClick={addToCartHandler}
              >
                <strong>Add To Cart</strong>
              </Button>
              <Toast
                style={{
                  color: "red",
                  backgroundColor: "pink",
                  marginTop: "10px",
                }}
                show={addToCartErr.length != 0}
                onClose={() => {
                  setaddToCartErr("");
                }}
                delay={3000}
                autohide
              >
                {/* <Toast.Header>
                  <strong className="mr-auto">Error:</strong>
                </Toast.Header> */}
                <Toast.Body>Purchase Limit Exceeded!</Toast.Body>
              </Toast>

              <Toast
                style={{
                  color: "green",
                  backgroundColor: "lightgreen",
                  marginTop: "10px",
                }}
                show={addToCartSuccess.length != 0}
                onClose={() => {
                  setaddToCartSuccess("");
                }}
                delay={3000}
                autohide
              >
                {/* <Toast.Header>
                  <strong className="mr-auto">Success:</strong>
                </Toast.Header> */}
                <Toast.Body>Added to cart successfully!</Toast.Body>
              </Toast>
            </div>
          ) : (
            <h1></h1>
          )}
          <br />
          <h3 style={{ fontFamily: "Rubik, sans-serif" }}>About this item:</h3>
          <p style={{ fontFamily: "Rubik, sans-serif" }}>
            {productDescription.description}
          </p>
          <Link
            to={{
              pathname: `/${type}/${catName}/${subCatName}/${productDescription._id}/reviews`,
              state: { productDescription: productDescription },
            }}
          >
            <Button
              style={{ fontFamily: "Rubik, sans-serif" }}
              className="btn-block"
              variant="secondary"
            >
              See all Reviews{" "}
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    body
  );
};

export default ProductDescScreen;
