import {
	BOOKING_CREATE_FAIL,
	BOOKING_CREATE_REQUEST,
	BOOKING_CREATE_RESET,
	BOOKING_CREATE_SUCCESS,
	BOOKING_DELETE_FAIL,
	BOOKING_DELETE_REQUEST,
	BOOKING_DELETE_SUCCESS,
	BOOKING_DETAILS_FAIL,
	BOOKING_DETAILS_REQUEST,
	BOOKING_DETAILS_SUCCESS,
	BOOKING_LIST_FAIL,
	BOOKING_LIST_REQUEST,
	BOOKING_LIST_SUCCESS,
	BOOKING_UPDATE_FAIL,
	BOOKING_UPDATE_REQUEST,
	BOOKING_UPDATE_SUCCESS,
	RESET_BOOKING_ITEM,
	SAVE_BOOKING_FAIL,
	SAVE_BOOKING_ITEM,
} from "../constants/bookingConstants"

export const bookingReducer = (state = { bookingItem: {} }, action) => {
	switch (action.type) {
		case SAVE_BOOKING_ITEM:
			return {
				loading: false,
				bookingItem: action.payload,
			}
		case SAVE_BOOKING_FAIL:
			return { loading: false, error: action.payload }
		case RESET_BOOKING_ITEM:
			return { loading: false, bookingItem: {} }
		default:
			return state
	}
}

export const bookingCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case BOOKING_CREATE_REQUEST:
			return {
				loading: true,
			}
		case BOOKING_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				booking: action.payload,
			}
		case BOOKING_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case BOOKING_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const bookingDetailsReducer = (
	state = { loading: true, booking: {} },
	action
) => {
	switch (action.type) {
		case BOOKING_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			}
		case BOOKING_DETAILS_SUCCESS:
			return {
				loading: false,
				booking: action.payload,
			}
		case BOOKING_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const bookingListReducer = (state = { bookings: [] }, action) => {
	switch (action.type) {
		case BOOKING_LIST_REQUEST:
			return {
				...state,
				loading: true,
			}
		case BOOKING_LIST_SUCCESS:
			return {
				loading: false,
				bookings: action.payload,
			}
		case BOOKING_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const bookingDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case BOOKING_DELETE_REQUEST:
			return { loading: true }
		case BOOKING_DELETE_SUCCESS:
			return { loading: false, success: true }
		case BOOKING_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const bookingUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case BOOKING_UPDATE_REQUEST:
			return { loading: true }
		case BOOKING_UPDATE_SUCCESS:
			return { loading: false, success: true }
		case BOOKING_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
