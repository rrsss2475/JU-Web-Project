import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const ReviewsScreen = ({ location }) => {
  const { productDescription } = location.state;

  const { catName, subCatName, id, type } = useParams()
  const [reviews, setreviews] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    if (type == "products") {
      axios
        .get(
          `http://localhost:5000/api/products/${catName}/${subCatName}/${id}/reviews`
        )
        .then((res) => {
          setreviews(res.data)
          setloading(false)
        })
    }
    else
    {
      axios
        .get(
          `http://localhost:5000/api/services/${catName}/${subCatName}/${id}/reviews`
        )
        .then((res) => {
          setreviews(res.data)
          setloading(false)
        })
    }
  }, [])
  return (
    <div className='container'>
      <h2>Reviews for {productDescription.name}</h2>


      {loading ? <h4>Loading...</h4> : reviews.length == 0 ? <h4>No Customer Reviews</h4> : <div>{
        reviews.map((review) => <p>{review.name}</p>)}</div>}
    </div>
  );
};

export default ReviewsScreen;
