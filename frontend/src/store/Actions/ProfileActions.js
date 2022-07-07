import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERROR
} from "../Constants/ProfileConstants";
import axios from "axios";
import { axiosInstance } from "../../utils/axiosInstance";

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axiosInstance.put(
      "/api/v1/my-account/update",
      userData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
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
