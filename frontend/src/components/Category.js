import React from "react";
import { Card, CardImg, Button } from "react-bootstrap";
import { Link, Switch, Route } from "react-router-dom";
import img from "../images/placeholder.png";

const Category = ({ category,type, variant, catName }) => {
  let body = (
    <Card className="my-3 p-3 rounded" style={{ border: "3px ridge green", height: "260px" }}>
      <Link to={`/${type}/${category.name}`} exact>
        <Card.Img
          src={category.image || img}
          variant="top"
          style={{ height: "150px" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/${type}/${category.name}`} exact>
          <Card.Title as="div" style={{ fontFamily: "Rubik, sans-serif" }}>
            <strong>
              <center>{category.name}</center>
            </strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );

  if (variant == "subcategory") {
    body = (
      <Card className="my-3 p-3 rounded" style={{ border: "3px ridge green" }}>
        <Link to={`/${type}/${catName}/${category.name}/`} exact>
          <Card.Img
            src={category.image || img}
            variant="top"
            style={{ height: "150px" }}
          />
        </Link>
        <Card.Body>
          <Link to={`/${type}/${catName}/${category.name}`} exact>
            <Card.Title as="div" style={{ fontFamily: "Rubik, sans-serif" }}>
              <strong>
                <center>{category.name}</center>
              </strong>
            </Card.Title>
          </Link>
        </Card.Body>
      </Card>
    );
  }

  return <div>{body}</div>;
};

export default Category;
