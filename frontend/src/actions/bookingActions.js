import axios from "axios"
import {
	BOOKING_CREATE_FAIL,
	BOOKING_CREATE_REQUEST,
	BOOKING_CREATE_RESET,
	BOOKING_CREATE_SUCCESS,
	BOOKING_DETAILS_FAIL,
	BOOKING_DETAILS_REQUEST,
	BOOKING_DETAILS_SUCCESS,
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

		const { data } = await axios.get(`/api/booking/${id}`, config)

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
