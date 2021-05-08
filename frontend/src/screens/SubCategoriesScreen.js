import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Category from "../components/Category";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listSubCategories } from "../actions/subcategoryActions";
import {listservSubCategories} from '../actions/servsubcategoryActions'

const SubCategoriesScreen = () => {
  const { type, catName } = useParams();
  const dispatch = useDispatch();

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { loading, error, subcategories } = subcategoryList;

  useEffect(() => {
    if(type == "products")
    dispatch(listSubCategories(catName));
    else
    dispatch(listservSubCategories(catName));
  }, [dispatch, catName]);

  let body = <h1></h1>;

  if (!loading) {
    body = (
      <Row>
        {subcategories.map((category) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Category
              catName={catName}
              type={type}
              variant="subcategory"
              category={category}
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
        className="btn btn-warning my-3 mx-2"
        to={`/${type}`}
      >
        <strong>Back to Categories</strong>
      </Link>
      <h1>{catName}</h1>
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

export default SubCategoriesScreen;
