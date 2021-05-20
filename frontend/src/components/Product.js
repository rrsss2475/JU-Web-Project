import React from "react";
import { Card, CardImg } from "react-bootstrap";
import { Link, Switch, Route } from "react-router-dom";
import img from "../images/baby.jpg";
import StarRatings from "react-star-ratings";

const Category = ({ product, type, catName, subCatName }) => {
  let body = (
    // <Card className="my-3 p-3 rounded">
    <Card
      className="my-3 p-1 rounded"
      style={{
        boxShadow:
          "0 1px 4px 0 rgba(0, 168, 0, 0.3), 0 2px 10px 0 rgba(0, 168, 0, 0.69)",
      }}
    >
      <Link
        to={{
          pathname: `/${type}/${catName}/${subCatName}/${product._id}`,
        }}
        exact
      >
        <Card.Img
          src={product.image || img}
          variant="top"
          style={{ height: "150px" }}
        />
      </Link>
      <Card.Body>
        <Link
          to={{
            pathname: `/${type}/${catName}/${subCatName}/${product._id}`,
          }}
          exact
        >
          <Card.Title as="div">
            <strong>{product.name}</strong>
            <br />
            <StarRatings
              rating={product.rating}
              starRatedColor="orange"
              starDimension="20px"
              starSpacing="0px"
              numberOfStars={5}
              name="rating"
            />
          </Card.Title>
        </Link>

        <strong>Rs {product.price}</strong>
      </Card.Body>
    </Card>
  );

  return <div>{body}</div>;
};

export default Category;
