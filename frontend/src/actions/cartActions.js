import axios from "axios"
import {
	CART_LIST_REQUEST,
	CART_LIST_SUCCESS,
	CART_LIST_FAIL,
} from "../constants/cartConstants"

export const listCart = (userid) => async (dispatch) => {
	try {
		dispatch({ type: CART_LIST_REQUEST })
		const { data } = await axios.post("http://localhost:5000/api/users/cart",
			{
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
