import {
	SAVE_ORDER_ITEMS,
	SAVE_ORDER_FAIL,
	ORDER_CREATE_FAIL,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_REQUEST,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_LIST_RESET,
	RESET_ORDER_ITEMS,
} from "../constants/orderConstants"

export const orderReducer = (state = { orderItems: [] }, action) => {
	switch (action.type) {
		case SAVE_ORDER_ITEMS:
			return {
				loading: false,
				orderItems: action.payload.orderItems,
				totalPrice: action.payload.totalPrice,
			}
		case SAVE_ORDER_FAIL:
			return { loading: false, error: action.payload }
		case RESET_ORDER_ITEMS:
			return { loading: false, orderItems: [] }
		default:
			return state
	}
}

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			}
		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			}
		case ORDER_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_LIST_RESET:
			return {}
		default:
			return state
	}
}

export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			}
		case ORDER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
