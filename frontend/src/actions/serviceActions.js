import axios from "axios"
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DESC_REQUEST,
	PRODUCT_DESC_SUCCESS,
	PRODUCT_DESC_FAIL,
} from "../constants/productConstants"

export const listServices = (catName, subCatName) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST })
		const { data } = await axios.get(`/api/services/${catName}/${subCatName}`)
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

export const serviceDescAction = (catName, subCatName, id) => async (
	dispatch
) => {
	try {
		dispatch({ type: PRODUCT_DESC_REQUEST })
		const { data } = await axios.get(`/api/services/${catName}/${subCatName}/${id}`
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
