import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getMyBookings } from "../actions/userActions"
import { Container, Card, Row, Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import moment from "moment"

const MyBookings = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMyBookings())
	}, [dispatch])

	const myBookings = useSelector((state) => state.myBookings)
	const { bookings, loading, error } = myBookings

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
				My Bookings
			</h1>
			{bookings.map((booking) => (
				<>
					<Card border="primary">
						<Card.Header>
							<Row>
								<Col>
									<h5>
										<strong>Total Price : ₹ {booking.totalPrice}</strong>
									</h5>
								</Col>
								{/* <Col></Col> */}
								<Col>
									<Link
										to={`/checkout/booking/${booking._id}`}
										style={{
											textDecoration: "none",
										}}
									>
										<h5>
											<strong>Booking # {booking._id}</strong>
										</h5>
									</Link>
								</Col>
							</Row>
						</Card.Header>
						<Card.Body>
							<Card.Title>
								<h4>
									<b>
										{booking.isCompleted
											? "Completed On : " +
											  moment(booking.completedAt).format("DD-MM-YYYY")
											: booking.status === "Cancelled"
											? booking.status
											: "To be Completed By : " +
											  moment(booking.toBeCompleted).format("DD-MM-YYYY")}
									</b>
								</h4>
							</Card.Title>
							<br />
							<Card.Text>
								<Row>
									<Col md={1}></Col>
									<Col md={2}>
										<center>
											<Image src={booking.bookingItem.image} fluid />
										</center>
									</Col>
									<Col>
										<center>
											<h5>
												<b>{booking.bookingItem.name}</b>
											</h5>
										</center>
									</Col>
								</Row>
							</Card.Text>
						</Card.Body>
					</Card>
					&nbsp;
				</>
			))}
		</Container>
	)
}

export default MyBookings
