import {
  CHANGE_WEBSITE_DETAILS_REQUEST,
  CHANGE_WEBSITE_DETAILS_SUCCESS,
  CHANGE_WEBSITE_DETAILS_FAIL,
  CHANGE_WEBSITE_DETAILS_RESET,
  WEBSITE_DETAILS_REQUEST,
  WEBSITE_DETAILS_SUCCESS,
  WEBSITE_DETAILS_FAIL,
  CLEAR_ERROR,
} from "../../Constants/WebsiteConstant";

export const websiteDetailsReducer = (state = { website: {} }, action) => {
  switch (action.type) {
    case CHANGE_WEBSITE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_WEBSITE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
        website: action.payload.website,
      };
    case CHANGE_WEBSITE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHANGE_WEBSITE_DETAILS_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const getWebsiteDetailsReducer = (state = { website: {} }, action) => {
  switch (action.type) {
    case WEBSITE_DETAILS_REQUEST:
      return {
        ...state,
        success: false,
        loading: true,
      };
    case WEBSITE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        website: action.payload.website,
        success: action.payload.success,
      };
    case WEBSITE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
