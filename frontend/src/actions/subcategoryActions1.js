import axios from "axios"
import {
	SUBCATEGORY_LIST_REQUEST,
	SUBCATEGORY_LIST_SUCCESS,
	SUBCATEGORY_LIST_FAIL,
} from "../constants/subcategoryConstants"

export const listSubCategories = (catName) => async (dispatch) => {
	try {
		dispatch({ type: SUBCATEGORY_LIST_REQUEST })
		const { data } = await axios.get(
			`http://localhost:5000/api/products/byid/${catName}`
		)
		dispatch({ type: SUBCATEGORY_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: SUBCATEGORY_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
