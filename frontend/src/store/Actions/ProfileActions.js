import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  CLEAR_ERROR,
} from "../Constants/ProfileConstants";
import { axiosInstance } from "../../utils/AxiosInstance";
import { getAuthToken } from "../../utils/authTokenLocalStorage";

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const token = getAuthToken();

    const config = { headers: { "Content-type": "multipart/form-data", token } };

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

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const token = getAuthToken();

    const config = {
      headers: { "Content-Type": "multipart/json", token: token },
    };

    const { data } = await axiosInstance.put(
      "/api/v1/my-account/password/update",
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
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
