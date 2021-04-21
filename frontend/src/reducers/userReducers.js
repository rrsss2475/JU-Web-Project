import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_SHIPPING_ADDRESS_REQUEST,
	USER_SHIPPING_ADDRESS_SUCCESS,
	USER_SHIPPING_ADDRESS_FAIL,
} from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true }
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGOUT:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true }
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const userShippingAddressReducer = (state = { address: [] }, action) => {
	switch (action.type) {
		case USER_SHIPPING_ADDRESS_REQUEST:
			return { loading: true, address: [] }
		case USER_SHIPPING_ADDRESS_SUCCESS:
			return { loading: false, address: action.payload }
		case USER_SHIPPING_ADDRESS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
