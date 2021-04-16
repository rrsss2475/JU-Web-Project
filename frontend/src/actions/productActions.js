import axios from "axios"
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
} from "../constants/productConstants"

export const listProducts = (catName, subCatName) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST })
		const { data } = await axios.get(
			`http://localhost:5000/api/products/${catName}/${subCatName}`
		)
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
