import {
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAIL,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAIL,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
  CLEAR_ERROR,
} from "../Constants/WishlistConstant";
import { axiosInstance } from "../../utils/AxiosInstance";
import { getAuthToken } from "../../utils/authTokenLocalStorage";

//Add To Wishlist
export const addToWishlist = (productid) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_TO_WISHLIST_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: { "Content-type": "application/json", token },
    };

    const { data } = await axiosInstance.put(
      "/api/v1/my-account/wishlist/new",
      { productid },
      config
    );

    dispatch({
      type: ADD_TO_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_WISHLIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Remove From Wishlist
export const removeFromWishlist = (productid) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_FROM_WISHLIST_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: { token },
    };

    const { data } = await axiosInstance.delete(
      `/api/v1/my-account/wishlist/${productid}`,
      config
    );

    dispatch({
      type: REMOVE_FROM_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_WISHLIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Wishlist
export const getWishlist = (productid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_WISHLIST_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: { token },
    };

    const { data } = await axiosInstance.get(
      `/api/v1/my-account/wishlist`,
      config
    );

    dispatch({
      type: GET_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_WISHLIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
