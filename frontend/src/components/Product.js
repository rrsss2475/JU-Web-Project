import React from "react"
import { Card, CardImg } from "react-bootstrap"
import { Link, Switch, Route } from "react-router-dom"
import img from "../images/baby.jpg"
import StarRatings from "react-star-ratings"

const Category = ({ product, type, catName, subCatName }) => {
	let body = (
		<Card className="my-3 p-3 rounded">
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
							name='rating'
						/>
					</Card.Title>
				</Link>

				<strong>Rs {product.price}</strong>
			</Card.Body>
		</Card>
	)

	return <div>{body}</div>
}

export default Category
