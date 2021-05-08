import React from "react"
import { useDispatch } from "react-redux"
import {
	Card,
	FormControl,
	Button,
	InputGroup,
	Container,
	Col,
	Row,
	CardDeck,
} from "react-bootstrap"

const UserAccount = () => {
	return (
		<Container md={3}>
			<Card style={{ width: "18rem" }} className="card">
				<Card.Img
					variant="left"
					src="data:image/jpeg;base64,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"
				/>

				<Card.Body>
					<Card.Title>Your Orders</Card.Title>
					<Card.Text>Check Order Status</Card.Text>
				</Card.Body>
			</Card>
		</Container>
	)
}

export default UserAccount