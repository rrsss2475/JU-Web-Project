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
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELETE_REQUEST,
	ORDER_DELETE_SUCCESS,
	ORDER_DELETE_FAIL,
	ORDER_UPDATE_REQUEST,
	ORDER_UPDATE_SUCCESS,
	ORDER_UPDATE_FAIL,
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

export const orderListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ORDER_LIST_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			}
		case ORDER_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const orderDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELETE_REQUEST:
			return { loading: true }
		case ORDER_DELETE_SUCCESS:
			return { loading: false, success: true }
		case ORDER_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const orderUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_UPDATE_REQUEST:
			return { loading: true }
		case ORDER_UPDATE_SUCCESS:
			return { loading: false, success: true }
		case ORDER_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
