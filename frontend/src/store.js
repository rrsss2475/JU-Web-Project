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
	userRegisterReducer,
	userShippingAddressReducer,
} from "./reducers/userReducers.js"
import { orderReducer } from "./reducers/orderReducers"

const reducer = combineReducers({
	categoryList: categoryListReducer,
	subcategoryList: subcategoryListReducer,
	productList: productListReducer,
	productDesc: productDescReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	addressList: userShippingAddressReducer,
	cart: cartReducer,
	addShippingAddress: userAddShippingAddressReducer,
	order: orderReducer,
})

// const cartItemsFromStorage = localStorage.getItem("cartItems")
// 	? JSON.parse(localStorage.getItem("cartItems"))
// 	: []

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
	cart: { cartItems: [], shippingAddress: shippingAddressFromStorage },
	order: {
		orderItems: orderDetailsFromStorage.orderItems,
		totalPrice: orderDetailsFromStorage.totalPrice,
	},
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
