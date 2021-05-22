import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import Category from "../components/Category"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { listSubCategories } from "../actions/subcategoryActions"
import { listservSubCategories } from "../actions/servsubcategoryActions"
import CatalogSteps from "../components/CatalogSteps"

const SubCategoriesScreen = () => {
	const { type, catName } = useParams()
	const dispatch = useDispatch()

	const subcategoryList = useSelector((state) => state.subcategoryList)
	const { loading, error, subcategories } = subcategoryList

	useEffect(() => {
		if (type == "products") {
			dispatch(listSubCategories(catName))
		} else {
			dispatch(listservSubCategories(catName))
		}
	}, [dispatch, catName])

	let body = <h1></h1>

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
		)
	}

	return (
		<div className="container" style={{ marginTop: "50px" }}>
			<CatalogSteps
				step1
				step2
				step3
				type={type}
				catName={catName}
				currStep={"step3"}
			/>
			<h1>{catName}</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				body
			)}
		</div>
	)
}

export default SubCategoriesScreen
