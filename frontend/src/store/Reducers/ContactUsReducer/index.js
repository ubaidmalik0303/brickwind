import {
  CONTACTUS_MAIL_REQUEST,
  CONTACTUS_MAIL_SUCCESS,
  CONTACTUS_MAIL_FAIL,
  CONTACTUS_MAIL_RESET,
  CLEAR_ERROR,
} from "../../Constants/ContactUsConstant";

export const contactUsReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACTUS_MAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONTACTUS_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case CONTACTUS_MAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CONTACTUS_MAIL_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
