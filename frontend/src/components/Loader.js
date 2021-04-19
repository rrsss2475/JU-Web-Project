import React from "react"
import { Spinner } from "react-bootstrap"

const Loader = ({ size }) => {
	let body = (
		<Spinner
			animation="border"
			variant="success"
			role="status"
			style={{
				width: "100px",
				height: "100px",
				margin: "auto",
				display: "block",
			}}
		>
			<span className="sr-only">Loading...</span>
		</Spinner>
	);
	if (size) {
		body=(
			<Spinner
			animation="border"
			variant="success"
			role="status"
			style={{
				width: `${size}px`,
				height: `${size}px`,
				margin: "auto",
				display: "block",
			}}
		>
			<span className="sr-only">Loading...</span>
		</Spinner>
		);
	}
	return (
		body
	)
}

export default Loader
