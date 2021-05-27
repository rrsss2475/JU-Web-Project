import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import { listServices } from "../actions/serviceActions";
import CatalogSteps from "../components/CatalogSteps";

const ProductScreen = () => {
  const { type, catName, subCatName } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    if (type === "products") dispatch(listProducts(catName, subCatName));
    else dispatch(listServices(catName, subCatName));
  }, [dispatch, catName, subCatName, type]);

  let body = <></>;

  if (!loading) {
    body = (
      <Container>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} style={{paddingLeft:"35px"}}>
            <Product
              product={product}
              type={type}
              catName={catName}
              subCatName={subCatName}
            />
          </Col>
        ))}
      </Row>
      </Container>
    );
  }

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <CatalogSteps
        step1
        step2
        step3
        step4
        type={type}
        catName={catName}
        subCat={subCatName}
        currStep={"step4"}
      />
      <h1 style={{marginLeft:"15px"}}>{subCatName}</h1>
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
