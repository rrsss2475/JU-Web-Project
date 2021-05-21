import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Category from "../components/Category.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { listCategories } from "../actions/categoryActions";
import { listservCategories } from "../actions/servcategoryActions"

const CategoriesScreen = () => {
  const dispatch = useDispatch();
  const {type}  = useParams();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;


  useEffect(() => {
    if(type == "products")
    dispatch(listCategories());
    else
    dispatch(listservCategories());
  }, [dispatch]);

  let body = <h1></h1>;

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
      <Link
        style={{ fontFamily: "Rubik, sans-serif" }}
        className="btn btn-warning my-3 mx-2"
        to="/"
      >
        <strong>Back to Home</strong>
      </Link>
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
