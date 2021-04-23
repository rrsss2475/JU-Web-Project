import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { categoryListReducer } from "./reducers/categoryReducers";
import { subcategoryListReducer } from "./reducers/subcategoryReducers";
import { productListReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	userAddShippingAddressReducer,
	userLoginReducer,
	userRegisterReducer,
	userShippingAddressReducer,
} from "./reducers/userReducers.js"

const reducer = combineReducers({
	categoryList: categoryListReducer,
	subcategoryList: subcategoryListReducer,
	productList: productListReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
  addressList: userShippingAddressReducer,
  cart: cartReducer,
	addShippingAddress: userAddShippingAddressReducer,
})


const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
