import axios from "axios"
import React, { useState, useEffect } from "react"
import { Card, Col, Container, Nav, NavLink, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import StarRatings from "react-star-ratings"
import moment from "moment"

const ReadMore = ({ children }) => {
	const word = children
	const [isReadMore, setIsReadMore] = useState(true)
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore)
	}

	// console.log(isReadMore);
	// console.log(word);
	// console.log(word.length);

	return (
		<p className="word">
			{isReadMore ? word.slice(0, 50) : word}
			<span onClick={toggleReadMore} className="read-or-hide">
				{isReadMore ? (
					<a
						style={{ textDecoration: "none", color: "#70757a" }}
						href="javascript:void(0);"
					>
						&emsp;<i class="fas fa-caret-down"></i> Read more
					</a>
				) : (
					<a
						style={{ textDecoration: "none", color: "#70757a" }}
						href="javascript:void(0);"
					>
						&emsp;<i class="fas fa-caret-up"></i> Read less
					</a>
				)}
			</span>
		</p>
	)
}

const ReviewsScreen = ({ location }) => {
	const { productDescription } = location.state

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
		} else {
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

	// console.log(reviews);

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
						<Card style={{ marginBottom: "10px" }} border="dark">
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
									{/* <ReadMore>{review.comment}</ReadMore> */}

									{review.comment.length < 50 ? (
										<p>{review.comment}</p>
									) : (
										<ReadMore>{review.comment}</ReadMore>
									)}
								</Card.Text>

								<Card.Footer
									style={{
										color: "#70757a",
										maxHeight: "7px",
										backgroundColor: "white",
									}}
								>
									<Row style={{ fontSize: "14px" }}>
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
	)
}

export default ReviewsScreen
