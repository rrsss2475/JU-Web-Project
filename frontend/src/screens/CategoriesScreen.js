import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Category from "../components/Category.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { listCategories } from "../actions/categoryActions";
import { listservCategories } from "../actions/servcategoryActions";
import CatalogSteps from "../components/CatalogSteps.js";

const CategoriesScreen = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    if (type === "products") dispatch(listCategories());
    else dispatch(listservCategories());
  }, [dispatch, type]);

  let body = <></>;

  if (!loading) {
    body = (
      <Row>
        {categories.map((category) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Category variant="category" type={type} category={category} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <CatalogSteps step1 step2 type={type} currStep={"step2"} />
      <h1>
        <strong>Categories</strong>
      </h1>
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

export default CategoriesScreen;
