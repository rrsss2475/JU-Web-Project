import axios from "axios"
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DELETE_FAIL,
	ORDER_DELETE_REQUEST,
	ORDER_DELETE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_UPDATE_FAIL,
	ORDER_UPDATE_REQUEST,
	ORDER_UPDATE_SUCCESS,
	SAVE_ORDER_FAIL,
	SAVE_ORDER_ITEMS,
} from "../constants/orderConstants"

export const saveOrderItems = (userInfo) => async (dispatch) => {
	try {
		const orderItems = []
		const cart = await axios.post("/api/users/cart", {
			userid: userInfo._id,
		})
		const cartItems = cart.data

		var totalPrice = 0
		for (var i = 0; i < cartItems.length; i++) {
			const { data } = await axios.get(
				`http://127.0.0.1:5000/api/products/categories/${cartItems[i].product}`
			)

			const orderItem = {
				name: data.name,
				qty: cartItems[i].qty,
				weight: data.isWeighted ? cartItems[i].weight : null,
				image: data.image,
				price: data.isWeighted
					? data.price * cartItems[i].qty * cartItems[i].weight
					: data.price * cartItems[i].qty,
				product: cartItems[i].product,
			}

			//console.log(orderItem)
			totalPrice += orderItem.price
			orderItems.push(orderItem)
		}
		const orderDetails = {
			orderItems: orderItems,
			totalPrice: totalPrice,
		}

		dispatch({ type: SAVE_ORDER_ITEMS, payload: orderDetails })

		localStorage.setItem("orderDetails", JSON.stringify(orderDetails))
	} catch (error) {
		dispatch({
			type: SAVE_ORDER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `${userInfo.token}`,
			},
		}

		const { data } = await axios.post("/api/orders", order, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: message,
		})
	}
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `${userInfo.token}`,
			},
		}

		// console.log(id)

		const { data } = await axios.get(`/api/orders/${id}`, config)

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: message,
		})
	}
}

export const getAllOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `${userInfo.token}`,
			},
		}

		// console.log(id)

		const { data } = await axios.get(`/api/orders`, config)

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		dispatch({
			type: ORDER_LIST_FAIL,
			payload: message,
		})
	}
}

export const deleteOrder = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DELETE_REQUEST })
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.delete(`/api/orders/admin/${id}`, config)
		dispatch({ type: ORDER_DELETE_SUCCESS })
	} catch (error) {
		dispatch({
			type: ORDER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateOrder = (id, status) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_UPDATE_REQUEST })
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.put(
			`/api/orders/admin/${id}`,
			{ status: status },
			config
		)
		dispatch({ type: ORDER_UPDATE_SUCCESS })
	} catch (error) {
		dispatch({
			type: ORDER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
