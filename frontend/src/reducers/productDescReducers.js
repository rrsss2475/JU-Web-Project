import {
	PRODUCT_DESC_REQUEST,
	PRODUCT_DESC_SUCCESS,
	PRODUCT_DESC_FAIL,
} from "../constants/productDescConstants"

export const productDescReducer = (state = { productDescription: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DESC_REQUEST:
			return { loading: true, productDescription: {} }
		case PRODUCT_DESC_SUCCESS:
			return { loading: false, productDescription: action.payload }
		case PRODUCT_DESC_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}