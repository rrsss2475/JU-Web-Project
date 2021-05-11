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
  USER_ADD_SHIPPING_ADDRESS_REQUEST,
  USER_ADD_SHIPPING_ADDRESS_SUCCESS,
  USER_ADD_SHIPPING_ADDRESS_FAIL,
  USER_MY_ORDERS_LIST_REQUEST,
  USER_MY_ORDERS_LIST_SUCCESS,
  USER_MY_ORDERS_LIST_FAIL,
  USER_MY_BOOKINGS_LIST_REQUEST,
  USER_MY_BOOKINGS_LIST_SUCCESS,
  USER_MY_BOOKINGS_LIST_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userShippingAddressReducer = (
  state = { addresses: [] },
  action
) => {
  switch (action.type) {
    case USER_SHIPPING_ADDRESS_REQUEST:
      return { loading: true, addresses: [] };
    case USER_SHIPPING_ADDRESS_SUCCESS:
      return { loading: false, addresses: action.payload };
    case USER_SHIPPING_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAddShippingAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_SHIPPING_ADDRESS_REQUEST:
      return { loading: true };
    case USER_ADD_SHIPPING_ADDRESS_SUCCESS:
      return { loading: false, address: action.payload };
    case USER_ADD_SHIPPING_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userOrderList = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_MY_ORDERS_LIST_REQUEST:
      return { loading: true };
    case USER_MY_ORDERS_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case USER_MY_ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userBookingList = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case USER_MY_BOOKINGS_LIST_REQUEST:
      return { loading: true };
    case USER_MY_BOOKINGS_LIST_SUCCESS:
      return { loading: false, bookings: action.payload };
    case USER_MY_BOOKINGS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
