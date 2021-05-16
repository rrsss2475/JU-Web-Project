import React from "react"
import { Spinner } from "react-bootstrap"

const Loader = ({ size }) => {
	let style = {
		width: "100px",
		height: "100px",
		margin: "auto",
		display: "block",
	}
	if (size) {
		style = {
			width: size,
			height: size,
			margin: "auto",
			display: "block",
		}
	}
	return (
		<Spinner animation="border" variant="success" role="status" style={style}>
			<span className="sr-only">Loading...</span>
		</Spinner>
	)
}

export default Loader
