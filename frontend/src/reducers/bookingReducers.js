import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_RESET,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  RESET_BOOKING_ITEM,
  SAVE_BOOKING_FAIL,
  SAVE_BOOKING_ITEM,
} from "../constants/bookingConstants";

export const bookingReducer = (state = { bookingItem: {} }, action) => {
  switch (action.type) {
    case SAVE_BOOKING_ITEM:
      return {
        loading: false,
        bookingItem: action.payload,
      };
    case SAVE_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    case RESET_BOOKING_ITEM:
      return { loading: false, bookingItem: {} };
    default:
      return state;
  }
};

export const bookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return {
        loading: true,
      };
    case BOOKING_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        booking: action.payload,
      };
    case BOOKING_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BOOKING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bookingDetailsReducer = (
  state = { loading: true, booking: {} },
  action
) => {
  switch (action.type) {
    case BOOKING_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BOOKING_DETAILS_SUCCESS:
      return {
        loading: false,
        booking: action.payload,
      };
    case BOOKING_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
