import React, { useState, useEffect } from "react"
import { Form, Button, Col, Row, Container, Toast } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"
import { useHistory } from "react-router"

const ProfileScreen = () => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	// const [message, setMessage] = useState(null);
	// const [update, setUpdate] = useState(null);

	const history = useHistory()

	const [message, setMessage] = useState("")
	const [update, setUpdate] = useState("")

	const dispatch = useDispatch()

	const [show, setShow] = useState(false)

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile
	const errorUpdate = userUpdateProfile.error

	// useEffect(() => {
	//   if (errorUpdate) {
	//     setMessage({ errorUpdate });
	//   }
	// }, [errorUpdate]);

	useEffect(() => {
		if (errorUpdate) {
			setMessage(errorUpdate)
		}
		if (!userInfo) {
			history.push("/login")
		} else {
			if (!user || !user.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET })
				dispatch(getUserDetails("profile"))
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [dispatch, history, userInfo, user, success, errorUpdate])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage("Passwords do not match")
			setPassword("")
			setConfirmPassword("")
		} else {
			dispatch(updateUserProfile({ name, email, password }))
			if (!errorUpdate) {
				setUpdate("Profile Updated Successfully")
				setPassword("")
				setConfirmPassword("")
			}
			// history.go(0);
		}
	}
	// {error ? && <Message variant="danger">{error}</Message>}
	return (
		<Container style={{ fontFamily: "Rubik, sans-serif", marginTop: "50px" }}>
			<center>
				<h2>User Profile</h2>
			</center>
			{/* {message && <Message variant="danger">{message}</Message>} */}
			{/* {success && <Message variant="success">Profile Updated</Message>} */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={3}></Col>
					<Col md={6}>
						<Toast
							style={{
								color: "red",
								backgroundColor: "pink",
								marginTop: "10px",
								maxWidth: "100%",
							}}
							show={message.length != 0}
							onClose={() => {
								setMessage("")
							}}
							delay={3000}
							autohide
						>
							<Toast.Body>{message}</Toast.Body>
						</Toast>

						<Toast
							style={{
								color: "green",
								backgroundColor: "lightgreen",
								marginTop: "10px",
								maxWidth: "100%",
							}}
							show={update.length != 0}
							onClose={() => {
								setUpdate("")
							}}
							delay={2000}
							autohide
						>
							<Toast.Body>{update}</Toast.Body>
						</Toast>

						<Form onSubmit={submitHandler}>
							<Form.Group controlId="name">
								<Form.Label class="font-weight-bold">Name</Form.Label>
								<Form.Control
									type="name"
									placeholder="Enter name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="email">
								<Form.Label class="font-weight-bold">Email Address</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="password">
								<Form.Label class="font-weight-bold">New Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter new password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="confirmPassword">
								<Form.Label class="font-weight-bold">
									Confirm Password
								</Form.Label>
								<Form.Control
									type="password"
									placeholder="Confirm password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								></Form.Control>
							</Form.Group>

							<center>
								<Button
									style={{ width: "30%", marginTop: "20px" }}
									type="submit"
									variant="warning"
								>
									<b>Update</b>
								</Button>
							</center>
						</Form>
					</Col>
				</Row>
			)}
		</Container>
	)
}

export default ProfileScreen
