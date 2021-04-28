import { SAVE_ORDER_ITEMS, SAVE_ORDER_FAIL } from "../constants/orderConstants"

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
		default:
			return state
	}
}
