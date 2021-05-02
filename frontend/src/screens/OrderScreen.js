import React, { useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { createOrder } from "../actions/orderActions"
import { resetUserCartandOrder } from "../actions/userActions"
import Address from "../components/Address"
import CheckoutSteps from "../components/CheckoutSteps"
import OrderItems from "../components/OrderItems"

const OrderScreen = ({ history }) => {
	const dispatch = useDispatch()

	const addressList = useSelector((state) => state.addressList)
	const shippingAddress = useSelector((state) => state.cart.shippingAddress)

	const orderState = useSelector((state) => state.order)
	const { orderItems, totalPrice } = orderState

	const cart = useSelector((state) => state.cart)

	const orderCreate = useSelector((state) => state.orderCreate)
	const { order, success, error } = orderCreate

	useEffect(() => {
		if (success) {
			const orderId = order._id
			dispatch(resetUserCartandOrder())
			history.push(`/order/${orderId}`)
		}
		// eslint-disable-next-line
	}, [dispatch, history, success])

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: orderItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				totalPrice: totalPrice,
			})
		)
	}

	return (
		<div class="container">
			<CheckoutSteps step1 step2 step3 step4 />
			<h1
				style={{
					textAlign: "center",
					marginTop: "50px",
				}}
			>
				Order Summary
			</h1>
			<OrderItems />
			&nbsp;
			<Address address={shippingAddress} />
			<br />
			<center>
				<Button
					onClick={placeOrderHandler}
					style={{ width: "100%", fontSize: "18px" }}
					variant="warning"
				>
					<strong>Place Order</strong>
				</Button>
			</center>
		</div>
	)
}

export default OrderScreen
