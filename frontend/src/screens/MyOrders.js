import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getMyOrders } from "../actions/userActions"
import { Container, Card, Row, Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import moment from "moment"

const MyOrders = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMyOrders())
	}, [dispatch])

	const myOrders = useSelector((state) => state.myOrders)
	const { orders, loading, error } = myOrders

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<Container>
			<h1
				style={{
					textAlign: "center",
					marginBottom: "50px",
					marginTop: "50px",
				}}
			>
				My Orders
			</h1>
			{orders.length === 0 ? (
				<h4>No Orders</h4>
			) : (
				orders.map((order) => (
					<>
						<Card border="primary">
							<Card.Header>
								<Row>
									<Col>
										<h5>
											<strong>Total Price : ₹ {order.totalPrice}</strong>
										</h5>
									</Col>
									{/* <Col></Col> */}
									<Col>
										<Link
											to={`/checkout/order/${order._id}`}
											style={{
												textDecoration: "none",
											}}
										>
											<h5>
												<strong>Order # {order._id}</strong>
											</h5>
										</Link>
									</Col>
								</Row>
							</Card.Header>
							<Card.Body>
								<Card.Title>
									<h4>
										<b>{order.status}</b>
										&nbsp;
										<b>
											{order.status === "Delivered"
												? "on : " +
												  moment(order.deliveredAt).format("DD-MM-YYYY")
												: ""}
										</b>
									</h4>
								</Card.Title>
								<Card.Text>
									{order.orderItems.map((item) => (
										<Row>
											<Col md={1}></Col>
											<Col md={2}>
												<Image src={item.image} fluid />
											</Col>
											<Col>
												<center>
													<h5>
														<b>{item.name}</b>
													</h5>
												</center>
											</Col>
										</Row>
									))}
								</Card.Text>
							</Card.Body>
						</Card>
						&nbsp;
					</>
				))
			)}
		</Container>
	)
}

export default MyOrders
