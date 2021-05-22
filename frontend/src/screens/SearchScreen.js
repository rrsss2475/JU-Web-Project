import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Loader from "../components/Loader";
import Product from "../components/Product";

const SearchScreen = () => {
  const { query } = useParams();
  const [loading, setloading] = useState(true);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    setloading(true);
    axios
      .get(`/api/products/search/${query}`)
      .then((res) => {
        setproducts(res.data);
        setloading(false);
      })
      .catch();
  }, [query]);

  let body;

  if (!loading) {
    body = (
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product
              product={product}
              type="products"
              catName={product.category.name}
              subCatName={product.subCategory.name}
            />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Container style={{ marginTop: "50px" }}>
      <p style={{ color: "#70757a" }}>
        {products.length > 1 ? (
          <>
            {products.length} search results for{" "}
            <span style={{ color: "green" }}>
              <strong>"{query}"</strong>
            </span>
          </>
        ) : (
          <>
            {products.length} search result for{" "}
            <span style={{ color: "green" }}>
              <strong>"{query}"</strong>
            </span>
          </>
        )}
      </p>
      <hr
        style={{
          borderColor: "rgb(0,168,0,0.3)",
          borderWidth: "2px",
        }}
      />
      {loading ? (
        <Loader />
      ) : products.length == 0 ? (
        <h1>No Results Found</h1>
      ) : (
        body
      )}
    </Container>
  );
};

export default SearchScreen;
