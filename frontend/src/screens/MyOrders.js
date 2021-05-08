import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getMyOrders } from "../actions/userActions"

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
		<div></div>
	)
}

export default MyOrders
