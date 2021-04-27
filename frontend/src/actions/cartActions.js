import axios from "axios"
import {
	CART_LIST_REQUEST,
	CART_LIST_SUCCESS,
	CART_LIST_FAIL,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants"

export const listCart = (userid) => async (dispatch) => {
	try {
		dispatch({ type: CART_LIST_REQUEST })
		const { data } = await axios.post("/api/users/cart", {
			userid: userid,
		})
		dispatch({ type: CART_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: CART_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const saveShippingAddress = (address) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: address,
	})

	// localStorage.setItem("shippingAddress", JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	})

	localStorage.setItem("paymentMethod", JSON.stringify(data))
}
