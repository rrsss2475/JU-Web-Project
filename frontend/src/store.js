import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { categoryListReducer } from "./reducers/categoryReducers";
import { subcategoryListReducer } from "./reducers/subcategoryReducers";
import {
  productListReducer,
  productDescReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userAddShippingAddressReducer,
  userBookingList,
  userLoginReducer,
  userOrderList,
  userRegisterReducer,
  userShippingAddressReducer,
  userDetailsReducer,
} from "./reducers/userReducers.js";
import {
  orderCreateReducer,
  orderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";
import {
  bookingReducer,
  bookingCreateReducer,
  bookingDetailsReducer,
} from "./reducers/bookingReducers";

const reducer = combineReducers({
  categoryList: categoryListReducer,
  subcategoryList: subcategoryListReducer,
  productList: productListReducer,
  productDesc: productDescReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  addressList: userShippingAddressReducer,
  cart: cartReducer,
  addShippingAddress: userAddShippingAddressReducer,
  order: orderReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  myOrders: userOrderList,
  booking: bookingReducer,
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  myBookings: userBookingList,
});

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : [];

const orderDetailsFromStorage = localStorage.getItem("orderDetails")
  ? JSON.parse(localStorage.getItem("orderDetails"))
  : null;

const bookingItemFromStorage = localStorage.getItem("bookingItem")
  ? JSON.parse(localStorage.getItem("bookingItem"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

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
  booking: {
    bookingItem: bookingItemFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
