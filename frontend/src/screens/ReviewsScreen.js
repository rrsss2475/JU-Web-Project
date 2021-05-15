import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import moment from "moment";

const ReviewsScreen = ({ location }) => {
  const { productDescription } = location.state;

  const { catName, subCatName, id, type } = useParams();
  const [reviews, setreviews] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (type == "products") {
      axios
        .get(
          `http://localhost:5000/api/products/${catName}/${subCatName}/${id}/reviews`
        )
        .then((res) => {
          setreviews(res.data);
          setloading(false);
        });
    } else {
      axios
        .get(
          `http://localhost:5000/api/services/${catName}/${subCatName}/${id}/reviews`
        )
        .then((res) => {
          setreviews(res.data);
          setloading(false);
        });
    }
  }, []);
  return (
    <Container style={{ fontFamily: "Rubik, sans-serif" }}>
      <h2>Reviews for {productDescription.name}</h2>

      {loading ? (
        <h4>Loading...</h4>
      ) : reviews.length == 0 ? (
        <h4>No Customer Reviews</h4>
      ) : (
        <>
          {reviews.map((review) => (
            <Card style={{ marginBottom: "10px" }} border="light">
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  <StarRatings
                    rating={parseInt(review.rating)}
                    starRatedColor="orange"
                    starDimension="20px"
                    starSpacing="0px"
                    numberOfStars={5}
                    name="rating"
                  />
                </Card.Subtitle>
                <Card.Text>
                  <h5>{review.comment}</h5>
                </Card.Text>
                <Card.Footer>
                  <Row>
                    <Col>{review.email}</Col>
                    <Col>{moment(review.createdAt).format("MMM, YYYY")}</Col>
                  </Row>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default ReviewsScreen;
