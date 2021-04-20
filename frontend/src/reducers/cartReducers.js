import {
	CART_LIST_REQUEST,
	CART_LIST_SUCCESS,
	CART_LIST_FAIL,
} from "../constants/cartConstants"

export const cartListReducer = (state = { cart: [] }, action) => {
	switch (action.type) {
		case CART_LIST_REQUEST:
			return { loading: true, cart: [] }
		case CART_LIST_SUCCESS:
			return { loading: false, cart: action.payload }
		case CART_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
