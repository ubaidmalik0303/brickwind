import {
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_RESET,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAIL,
  REMOVE_FROM_WISHLIST_RESET,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
  CLEAR_ERROR,
} from "../../Constants/WishlistConstant";

export const wishlistReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST_REQUEST:
    case REMOVE_FROM_WISHLIST_REQUEST:
    case GET_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        wishlist: action.payload.wishlist,
      };
    case REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        wishlist: action.payload.wishlist,
      };
    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: action.payload.wishlist,
      };
    case ADD_TO_WISHLIST_FAIL:
    case REMOVE_FROM_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TO_WISHLIST_RESET:
      return {
        ...state,
        success: false,
      };
    case REMOVE_FROM_WISHLIST_RESET:
      return {
        ...state,
        isDeleted: false,
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

export const getWishlistReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case GET_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: action.payload.wishlist,
      };
    case GET_WISHLIST_FAIL:
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
