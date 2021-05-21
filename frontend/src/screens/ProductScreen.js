import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import { listServices } from "../actions/serviceActions";

const ProductScreen = () => {
  const { type, catName, subCatName } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    if(type == "products")
    dispatch(listProducts(catName, subCatName));
    else 
    dispatch(listServices(catName, subCatName));
  }, [dispatch, catName, subCatName]);

  let body = <h1></h1>;

  if (!loading) {
    body = (
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product
              product={product}
              type={type}
              catName={catName}
              subCatName={subCatName}
            />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <div className="container" style={{ marginTop: "50px" }}>
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
        <strong>Back to {type}</strong>
      </Link>
      <strong style={{ color: "green" }}>&gt;</strong>
      <Link
        style={{ fontFamily: "Rubik, sans-serif" }}
        className="btn btn-warning my-3 mx-2"
        to={`/${type}/${catName}`}
      >
        <strong>Back to {catName}</strong>
      </Link>
      <h1>{subCatName}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        body
      )}
    </div>
  );
};


export default ProductScreen;
