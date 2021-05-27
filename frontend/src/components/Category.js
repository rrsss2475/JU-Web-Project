import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "../images/placeholder.png";

const Category = ({ category, type, variant, catName }) => {
  let body = (
    // <Card className="my-3 p-3 rounded" style={{ border: "3px ridge green", height: "260px" }}>
    <Card
      className="my-3 p-1 rounded"
      style={{
        boxShadow:
          "0 1px 4px 0 rgba(0, 168, 0, 0.3), 0 2px 10px 0 rgba(0, 168, 0, 0.69)",
        height: "220px",
        width:"250px"
      }}
    >
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

  if (variant === "subcategory") {
    body = (
      // <Card className="my-3 p-3 rounded" style={{ border: "3px ridge green" }}>
      <Card
        className="my-3 p-1 rounded"
        style={{
          boxShadow:
            "0 1px 4px 0 rgba(0, 168, 0, 0.3), 0 2px 10px 0 rgba(0, 168, 0, 0.69)",
          height: "220px",
          width:"250px"
        }}
      >
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
