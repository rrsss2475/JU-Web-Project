import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { categoryListReducer } from "./reducers/categoryReducers"
import { subcategoryListReducer } from "./reducers/subcategoryReducers"
import { productListReducer } from "./reducers/productReducers"
import { userLoginReducer } from "./reducers/userReducers.js"

const reducer = combineReducers({
	categoryList: categoryListReducer,
	subcategoryList: subcategoryListReducer,
	productList: productListReducer,
	userLogin: userLoginReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
