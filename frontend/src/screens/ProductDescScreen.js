import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Form, Button, Toast } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductDescScreen = ({ location }) => {
  const { product } = location.state;
  const [qty, setqty] = useState(1);
  const [user, setuser] = useState("Loading...");
  const { catName, subCatName } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/userName/${product.user}`)
      .then((res) => {
        setuser(res.data.name);
      });
  }, []);

  const addToCartHandler = () => {};

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <Link className="btn btn-success my-3 mx-2" to={`/`}>
        <strong>Back to Home</strong>
      </Link>
      <strong style={{ color: "green" }}>&gt;</strong>
      <Link className="btn btn-success my-3 mx-2" to={`/categories`}>
        <strong>Back to Categories</strong>
      </Link>
      <strong style={{ color: "green" }}>&gt;</strong>
      <Link className="btn btn-success my-3 mx-2" to={`/categories/${catName}`}>
        <strong>Back to {catName}</strong>
      </Link>
      <strong style={{ color: "green" }}>&gt;</strong>
      <Link
        className="btn btn-warning my-3 mx-2"
        to={`/categories/${catName}/${subCatName}`}
      >
        <strong>Back to {subCatName}</strong>
      </Link>
      <Row style={{ marginTop: "20px" }}>
        <Col sm={12} md={8} lg={6} xl={6}>
          <img
            src={product.image}
            style={{ height: "100%", width: "100%", maxHeight: "500px" }}
          />
        </Col>
        <Col sm={12} md={8} lg={5} xl={4}>
          <h1>{product.name}</h1>
          By {user}
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <br />
          <b>Price: Rs {product.price}</b>
          <br />
          {product.isAvailable ? (
            <div style={{ color: "green", fontWeight: "bold" }}>In Stock</div>
          ) : (
            <div style={{ color: "red", fontWeight: "bold" }}>Out Of Stock</div>
          )}
          <br />
          {product.isAvailable ? (
            <div>
              <strong>Qty -</strong>
              <Form.Control
                style={{ marginTop: "5px" }}
                as="select"
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
                className="btn-block btn-warning"
                type="button"
                style={{ marginTop: "10px" }}
              >
                <strong>Add To Cart</strong>
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
            <Button className="btn-block" variant="warning">
              <strong>See all Reviews </strong>
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDescScreen;
