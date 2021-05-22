import axios from "axios"
import {
	BOOKING_CREATE_FAIL,
	BOOKING_CREATE_REQUEST,
	BOOKING_CREATE_RESET,
	BOOKING_CREATE_SUCCESS,
	BOOKING_DELETE_FAIL,
	BOOKING_DELETE_REQUEST,
	BOOKING_DELETE_SUCCESS,
	BOOKING_DETAILS_FAIL,
	BOOKING_DETAILS_REQUEST,
	BOOKING_DETAILS_SUCCESS,
	BOOKING_LIST_FAIL,
	BOOKING_LIST_REQUEST,
	BOOKING_LIST_SUCCESS,
	BOOKING_UPDATE_FAIL,
	BOOKING_UPDATE_REQUEST,
	BOOKING_UPDATE_SUCCESS,
	RESET_BOOKING_ITEM,
	SAVE_BOOKING_FAIL,
	SAVE_BOOKING_ITEM,
} from "../constants/bookingConstants"

export const saveBookingItem = (booking) => async (dispatch) => {
	try {
		if (booking) {
			dispatch({
				type: SAVE_BOOKING_ITEM,
				payload: booking,
			})
			localStorage.setItem("bookingItem", JSON.stringify(booking))
		}
	} catch (error) {
		dispatch({
			type: SAVE_BOOKING_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createBooking = (booking) => async (dispatch, getState) => {
	try {
		dispatch({ type: BOOKING_CREATE_REQUEST })
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `${userInfo.token}`,
			},
		}

		const { data } = await axios.post("/api/bookings", booking, config)

		dispatch({
			type: BOOKING_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: BOOKING_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getBookingDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BOOKING_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/bookings/${id}`, config)

		dispatch({
			type: BOOKING_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		dispatch({
			type: BOOKING_DETAILS_FAIL,
			payload: message,
		})
	}
}

export const resetUserBooking = () => async (dispatch) => {
	try {
		localStorage.removeItem("bookingDetails")
		localStorage.removeItem("shippingAddress")
		localStorage.removeItem("paymentMethod")
		dispatch({ type: RESET_BOOKING_ITEM })
		dispatch({ type: BOOKING_CREATE_RESET })
	} catch (error) {
		console.log(error)
	}
}

export const getAllBookings = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: BOOKING_LIST_REQUEST,
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

		const { data } = await axios.get(`/api/bookings`, config)

		dispatch({
			type: BOOKING_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		dispatch({
			type: BOOKING_LIST_FAIL,
			payload: message,
		})
	}
}

export const deleteBooking = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: BOOKING_DELETE_REQUEST })
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.delete(`/api/bookings/admin/${id}`, config)
		dispatch({ type: BOOKING_DELETE_SUCCESS })
	} catch (error) {
		dispatch({
			type: BOOKING_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateBooking = (id, status) => async (dispatch, getState) => {
	try {
		dispatch({ type: BOOKING_UPDATE_REQUEST })
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		}

		const { data } = await axios.put(
			`/api/bookings/admin/${id}`,
			{ status: status },
			config
		)
		dispatch({ type: BOOKING_UPDATE_SUCCESS })
	} catch (error) {
		dispatch({
			type: BOOKING_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
