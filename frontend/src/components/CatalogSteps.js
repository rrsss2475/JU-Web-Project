import React from "react";
import { Nav, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CatalogSteps = ({
  step1,
  step2,
  step3,
  step4,
  type,
  catName,
  subCat,
  currStep,
}) => {
  return (
    <Nav
      className="justify-content-left mb-4"
      style={{ fontSize: "20px", fontFamily: "Rubik, sans-serif" }}
      id="catalog-steps"
    >
      {/* <Row> */}
      {/* <Col xs={12} md={12}> */}
      <Nav.Item className="font-weight-bold">
        {step1 && currStep === "step1" ? (
          <LinkContainer to="/">
            <Nav.Link className="text-warning">Home</Nav.Link>
          </LinkContainer>
        ) : step1 ? (
          <LinkContainer to="/">
            <Nav.Link className="text-success">Home</Nav.Link>
          </LinkContainer>
        ) : (
          ""
        )}
      </Nav.Item>
      {/* </Col> */}

      {/* <Col> */}
      <Nav.Item className="font-weight-bold">
        {step2 && currStep === "step2" ? (
          <LinkContainer to={`/${type}`}>
            <Nav.Link className="text-warning">Categories</Nav.Link>
          </LinkContainer>
        ) : step2 ? (
          <LinkContainer to={`/${type}`}>
            <Nav.Link className="text-success">Categories</Nav.Link>
          </LinkContainer>
        ) : (
          ""
        )}
      </Nav.Item>
      {/* </Col> */}

      {/* <Col> */}
      <Nav.Item className="font-weight-bold">
        {step3 && currStep === "step3" ? (
          <LinkContainer to={`/${type}/${catName}`}>
            <Nav.Link className="text-warning">{catName}</Nav.Link>
          </LinkContainer>
        ) : step3 ? (
          <LinkContainer to={`/${type}/${catName}`}>
            <Nav.Link className="text-success">{catName}</Nav.Link>
          </LinkContainer>
        ) : (
          ""
        )}
      </Nav.Item>
      {/* </Col> */}

      {/* <Col> */}
      <Nav.Item className="font-weight-bold">
        {step4 && currStep === "step4" ? (
          <LinkContainer to={`/${type}/${catName}/${subCat}`}>
            <Nav.Link className="text-warning">{subCat}</Nav.Link>
          </LinkContainer>
        ) : step4 ? (
          <LinkContainer to={`/${type}/${catName}/${subCat}`}>
            <Nav.Link className="text-success">{subCat}</Nav.Link>
          </LinkContainer>
        ) : (
          ""
        )}
      </Nav.Item>
      {/* </Col> */}
      {/* </Row> */}
    </Nav>
  );
};

export default CatalogSteps;
