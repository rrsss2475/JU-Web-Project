import axios from "axios"
import { CART_LIST_RESET } from "../constants/cartConstants"
import {
	ORDER_LIST_RESET,
	RESET_ORDER_ITEMS,
} from "../constants/orderConstants"
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_SHIPPING_ADDRESS_REQUEST,
	USER_SHIPPING_ADDRESS_SUCCESS,
	USER_SHIPPING_ADDRESS_FAIL,
	USER_ADD_SHIPPING_ADDRESS_REQUEST,
	USER_ADD_SHIPPING_ADDRESS_SUCCESS,
	USER_ADD_SHIPPING_ADDRESS_FAIL,
	USER_MY_ORDERS_LIST_FAIL,
	USER_MY_ORDERS_LIST_REQUEST,
	USER_MY_ORDERS_LIST_SUCCESS,
	USER_MY_BOOKINGS_LIST_SUCCESS,
	USER_MY_BOOKINGS_LIST_REQUEST,
	USER_MY_BOOKINGS_LIST_FAIL,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		}

		const { data } = await axios.post(
			"/api/users/login",
			{ email, password },
			config
		)

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem("userInfo", JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem("userInfo")
	localStorage.removeItem("orderDetails")
	localStorage.removeItem("shippingAddress")
	localStorage.removeItem("paymentMethod")
	localStorage.removeItem("bookingItem")
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: ORDER_LIST_RESET })
	dispatch({ type: CART_LIST_RESET })
}

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		}

		const { data } = await axios.post(
			"/api/users/register",
			{ name, email, password },
			config
		)

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem("userInfo", JSON.stringify(data))
	} catch (errorR) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				errorR.response && errorR.response.data.message
					? errorR.response.data.message
					: errorR.message,
		})
	}
}

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/users/${id}`, config)

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (errorR) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				errorR.response && errorR.response.data.message
					? errorR.response.data.message
					: errorR.message,
		})
	}
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `${userInfo.token}`,
			},
		}

		const { data } = await axios.put(`/api/users/profile`, user, config)

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		})
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})
		localStorage.setItem("userInfo", JSON.stringify(data))
	} catch (errorR) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				errorR.response && errorR.response.data.message
					? errorR.response.data.message
					: errorR.message,
		})
	}
}

export const getShippingAddress = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_SHIPPING_ADDRESS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.get("/api/users/shipping", config)

		dispatch({
			type: USER_SHIPPING_ADDRESS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_SHIPPING_ADDRESS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const addShippingAddress =
	(name, street, city, state, zip, country) => async (dispatch, getState) => {
		try {
			dispatch({
				type: USER_ADD_SHIPPING_ADDRESS_REQUEST,
			})

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `${userInfo.token}`,
				},
			}

			const body = {
				name,
				street,
				city,
				state,
				zip,
				country,
			}

			const { data } = await axios.post("/api/users/shipping", body, config)

			dispatch({
				type: USER_ADD_SHIPPING_ADDRESS_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: USER_ADD_SHIPPING_ADDRESS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

export const resetUserCartandOrder = () => async (dispatch, getState) => {
	try {
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.post("/api/users/resetCart", {}, config)

		localStorage.removeItem("orderDetails")
		localStorage.removeItem("shippingAddress")
		localStorage.removeItem("paymentMethod")
		dispatch({ type: CART_LIST_RESET })
		dispatch({ type: ORDER_LIST_RESET })
		dispatch({ type: RESET_ORDER_ITEMS })
	} catch (error) {}
}

export const getMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_MY_ORDERS_LIST_REQUEST })
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.get("/api/users/getOrders", config)

		dispatch({ type: USER_MY_ORDERS_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_MY_ORDERS_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getMyBookings = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_MY_BOOKINGS_LIST_REQUEST })
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.get("/api/users/getBookings", config)

		dispatch({ type: USER_MY_BOOKINGS_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_MY_BOOKINGS_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
