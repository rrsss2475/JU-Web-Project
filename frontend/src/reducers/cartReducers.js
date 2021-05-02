import {
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  CART_LIST_RESEST,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { loading: true, cartItems: [] };
    case CART_LIST_SUCCESS:
      return { loading: false, cartItems: action.payload };
    case CART_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_LIST_RESEST:
      return {
        state: {},
      };
    default:
      return state;
  }
};
