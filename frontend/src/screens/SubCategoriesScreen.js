import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import Category from "../components/Category"
import { listSubCategories } from "../actions/subcategoryActions"

const SubCategoriesScreen = () => {
	const { catName } = useParams()
	const dispatch = useDispatch()

	const subcategoryList = useSelector((state) => state.subcategoryList)
	const { loading, error, subcategories } = subcategoryList

	useEffect(() => {
		dispatch(listSubCategories(catName))
	}, [catName, dispatch])

	let body = <h1></h1>

	if (!loading) {
		body = (
			<Row>
				{subcategories.map((category) => (
					<Col sm={12} md={6} lg={4} xl={3}>
						<Category
							catName={catName}
							type="subcategory"
							category={category}
						/>
					</Col>
				))}
			</Row>
		)
	}

	return (
		<div className="container" style={{ marginTop: "100px" }}>
			<Link className="btn btn-dark my-3 mx-2" to="/categories">
				Back to Categories
			</Link>
			<h1>{catName}</h1>
			{loading ? <h1>Loading...</h1> : error ? <h1>Error</h1> : body}
		</div>
	)
}

export default SubCategoriesScreen
