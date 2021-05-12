import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { categoryListReducer } from "./reducers/categoryReducers"
import { subcategoryListReducer } from "./reducers/subcategoryReducers"
import {
	productListReducer,
	productDescReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import {
	userAddShippingAddressReducer,
	userLoginReducer,
	userOrderList,
	userListReducer,
	userRegisterReducer,
	userShippingAddressReducer,
	userDeleteReducer,
	userDetailsReducer,
	userUpdateReducer,
} from "./reducers/userReducers.js"
import {
	orderCreateReducer,
	orderReducer,
	orderDetailsReducer,
} from "./reducers/orderReducers"

const reducer = combineReducers({
	categoryList: categoryListReducer,
	subcategoryList: subcategoryListReducer,
	productList: productListReducer,
	productDesc: productDescReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userList: userListReducer,
	userDetails: userDetailsReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	addressList: userShippingAddressReducer,
	cart: cartReducer,
	addShippingAddress: userAddShippingAddressReducer,
	order: orderReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	myOrders: userOrderList,
})

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: []

const orderDetailsFromStorage = localStorage.getItem("orderDetails")
	? JSON.parse(localStorage.getItem("orderDetails"))
	: null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: null

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	cart: {
		cartItems: [],
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
	order: {
		orderItems: orderDetailsFromStorage
			? orderDetailsFromStorage.orderItems
			: null,
		totalPrice: orderDetailsFromStorage
			? orderDetailsFromStorage.totalPrice
			: null,
	},
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
