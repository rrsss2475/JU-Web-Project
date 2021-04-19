import axios from "axios"
import {
	PRODUCT_DESC_REQUEST,
	PRODUCT_DESC_SUCCESS,
	PRODUCT_DESC_FAIL,
} from "../constants/productDescConstants"

export const productDescAction = (catName, subCatName, id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DESC_REQUEST })
		const { data } = await axios.get(
			`http://localhost:5000/api/products/${catName}/${subCatName}/${id}`
		)
		dispatch({ type: PRODUCT_DESC_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCT_DESC_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
