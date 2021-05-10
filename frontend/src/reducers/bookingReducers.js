import {
  RESET_BOOKING_ITEM,
  SAVE_BOOKING_FAIL,
  SAVE_BOOKING_ITEM,
} from "../constants/bookingConstants";

export const bookingReducer = (state = { booking: {} }, action) => {
  switch (action.type) {
    case SAVE_BOOKING_ITEM:
      return {
        loading: false,
        booking: action.payload,
      };
    case SAVE_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    case RESET_BOOKING_ITEM:
      return { loading: false, booking: {} };
    default:
      return state;
  }
};

// export const orderCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ORDER_CREATE_REQUEST:
//       return {
//         loading: true,
//       };
//     case ORDER_CREATE_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//         order: action.payload,
//       };
//     case ORDER_CREATE_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case ORDER_LIST_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

// export const orderDetailsReducer = (
//   state = { loading: true, orderItems: [], shippingAddress: {} },
//   action
// ) => {
//   switch (action.type) {
//     case ORDER_DETAILS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case ORDER_DETAILS_SUCCESS:
//       return {
//         loading: false,
//         order: action.payload,
//       };
//     case ORDER_DETAILS_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
