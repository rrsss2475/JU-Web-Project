import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col, Container, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listAllProducts, createProduct } from "../actions/serviceActions"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"
import { DeleteModal } from "../components/Modal"
import { Link } from "react-router-dom"

const ServiceListScreen = ({ history, match }) => {
	const dispatch = useDispatch()
	const [modalShow, setModalShow] = React.useState(false)
	const [productid, setProductId] = React.useState()

	const productList = useSelector((state) => state.productList)
	const { loading, error, products } = productList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const productDelete = useSelector((state) => state.productDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete

	const productCreate = useSelector((state) => state.productCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate

	let str
	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET })
		if (!userInfo || !userInfo.isAdmin) {
			history.push("/login")
		}

		if (successCreate) {
			history.push(`/admin/service/${createdProduct._id}/edit`)
		} else {
			dispatch(listAllProducts())
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
	])

	const createProductHandler = () => {
		dispatch(createProduct())
	}

	const [categorySelect, setCategory] = React.useState("")
	const [subCategorySelect, setSubCatgory] = React.useState("")

	let categorySet = new Set()

	const categories = {}
	products.map((product) => {
		if (!categories.hasOwnProperty(product.category.name)) {
			categories[product.category.name] = new Set([product.subCategory.name])
		} else {
			categories[product.category.name].add(product.subCategory.name)
		}

		categorySet.add(product.category.name)
	})

	// console.log(categories)
	let subCategory

	if (categorySelect !== "") {
		// console.log(categories[categorySelect])
		subCategory = [...categories[categorySelect]].map((subCat) => (
			<option value={subCat}>{subCat}</option>
		))
	}

	return (
		<Container
			style={{
				fontFamily: "Rubik, sans-serif",
			}}
		>
			<Row className="align-items-center">
				<Col>
					<h1>Services</h1>
				</Col>
				<Col align-text="right">
					<Button
						className="my-5"
						style={{
							backgroundColor: "black",
							border: "2px solid black",
							float: "right",
						}}
						onClick={createProductHandler}
					>
						<i className="fas fa-plus"></i> CREATE SERVICE
					</Button>
				</Col>
			</Row>
			<Row>
				<Col></Col>
				<Col></Col>
				<Col></Col>
				<Col>
					<Form>
						<Form.Group controlId="">
							<Form.Label>
								<b>Filter By Category : </b>
							</Form.Label>
							<Form.Control
								as="select"
								custom
								onChange={(event) => {
									setCategory(event.target.value)
									setSubCatgory("")
								}}
							>
								<option value="">NULL</option>
								{[...categorySet].map((cat) => (
									<option value={cat}>{cat}</option>
								))}
							</Form.Control>
						</Form.Group>
					</Form>
				</Col>
				<Col>
					<Form>
						<Form.Group controlId="">
							<Form.Label>
								<b>Filter By Sub-Category : </b>
							</Form.Label>
							<Form.Control
								as="select"
								custom
								onChange={(event) => {
									setSubCatgory(event.target.value)
								}}
							>
								<option value="">NULL</option>
								{subCategory}
							</Form.Control>
						</Form.Group>
					</Form>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="danger">{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>SUBCATEGORY</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products
								.filter((product) => {
									if (subCategorySelect === "" && categorySelect === "") {
										return product
									} else {
										if (
											(product.category.name === categorySelect ||
												categorySelect === "") &&
											(product.subCategory.name === subCategorySelect ||
												subCategorySelect === "")
										) {
											return product
										}
									}
								})
								.map((product) => (
									<tr key={product._id}>
										<td>
											<Link
												to={`/services/${product.category.name}/${product.subCategory.name}/${product._id}`}
												style={{ textDecoration: "none" }}
											>
												{product._id}
											</Link>
										</td>
										<td>{product.name}</td>

										<td>
											<i className="fas fa-ruppee"></i>
											{product.price}
										</td>
										<td>{product.category.name}</td>
										<td>{product.subCategory.name}</td>
										<td>
											<LinkContainer to={`/admin/service/${product._id}/edit`}>
												<Button variant="light" className="btn-sm">
													<i className="fas fa-edit"></i>
												</Button>
											</LinkContainer>
											<Button
												variant="danger"
												className="btn-sm"
												//   onClick={() => deleteHandler(product._id)}
												onClick={() => {
													setModalShow(true)
													setProductId(product._id)
												}}
											>
												<i className="fas fa-trash"></i>
											</Button>
										</td>
									</tr>
								))}
						</tbody>
						<DeleteModal
							show={modalShow}
							type={"Service"}
							id={productid}
							onHide={() => setModalShow(false)}
						/>
					</Table>
				</>
			)}
		</Container>
	)
}

export default ServiceListScreen
