import React from "react"
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import CheckoutSteps from "../components/CheckoutSteps"

const PlaceOrderScreen = ({ match }) => {
	const cart = useSelector((state) => state.cart)
	const { shippingAddress, paymentMethod, loading, error } = cart

	const order = useSelector((state) => state.order)
	const { orderItems, totalPrice } = order

	const { userInfo } = useSelector((state) => state.userLogin)

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<div className="container">
			<CheckoutSteps step1 step2 step3 step4 />
			<h2>Order Summary</h2>
			<Row style={{ fontFamily: "Rubik, sans-serif" }}>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Your Details</h2>
							{/* <br /> */}
							<p>
								<strong>Name: </strong>
								{userInfo.name}
							</p>
							<p>
								<strong>Email: </strong>
								{userInfo.email}
							</p>
							<p>
								<strong>Address: </strong>
								{shippingAddress.name}, {shippingAddress.street},{" "}
								{shippingAddress.city},{shippingAddress.state},
								{shippingAddress.country},{shippingAddress.zip}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{orderItems.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant="flush">
									{orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row style={{ fontFamily: "Rubik, sans-serif" }}>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													{/* <Link to={`/product/${item.product}`}> */}
													{item.name}
													{/* </Link> */}
												</Col>
												<Col md={4}>
													Qty: {item.qty} | ₹{item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={4}>
					<Card
						style={{ border: "2px solid", fontFamily: "Rubik, sans-serif" }}
					>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Payment Summary</h2>
								<hr />
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>
										<strong>Total</strong>
									</Col>
									<Col>₹ {totalPrice}</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default PlaceOrderScreen
