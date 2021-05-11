import axios from "axios";
import {
  SAVE_BOOKING_FAIL,
  SAVE_BOOKING_ITEM,
} from "../constants/bookingConstants";

export const saveBookingItem = (booking) => async (dispatch) => {
  try {
    if (booking) {
      dispatch({
        type: SAVE_BOOKING_ITEM,
        payload: booking,
      });
      localStorage.setItem("bookingItem", JSON.stringify(booking));
    }
  } catch (error) {
    dispatch({
      type: SAVE_BOOKING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
