import { Modal, Button } from "react-bootstrap"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { deleteOrder } from "../actions/orderActions"
import { deleteProduct } from "../actions/productActions"
import { deleteUser } from "../actions/userActions"
import { deleteBooking } from "../actions/bookingActions"

export function MyVerticallyCenteredModal({ show, onHide, type, id, token }) {
	const history = useHistory()
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `${token}`,
		},
	}

	const cancelHandler = async (e) => {
		e.preventDefault()
		if (type === "Order") {
			await axios.put(
				`/api/orders/${id}/status`,
				{ status: "Cancelled" },
				config
			)
			history.go(0)
		} else {
			await axios.put(
				`/api/bookings/${id}/status`,
				{ status: "Cancelled" },
				config
			)
			history.go(0)
		}
	}
	return (
		<Modal
			show={show}
			onHide={onHide}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className="modal-backdrop"
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Cancel {type}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p style={{ fontSize: "18px" }}>
					<b>Are you sure you want to cancel?</b>
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Close</Button>
				<Button variant="danger" onClick={cancelHandler}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
export function DeleteModal({ show, onHide, type, id }) {
	const dispatch = useDispatch()

	const deleteHandler = (e) => {
		e.preventDefault()
		switch (type) {
			case "Order":
				dispatch(deleteOrder(id))
				onHide()
				break
			case "Booking":
				dispatch(deleteBooking(id))
				onHide()
				break
			case "Product":
				dispatch(deleteProduct(id))
				onHide()
				break
			case "User":
				dispatch(deleteUser(id))
				onHide()
				break
			default:
				onHide()
				break
		}
	}
	return (
		<Modal
			show={show}
			onHide={onHide}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Delete {type}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p style={{ fontSize: "18px" }}>
					<b>Are you sure you want to delete this {type}?</b>
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Close</Button>
				<Button variant="danger" onClick={deleteHandler}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
