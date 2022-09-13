import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  LIST_ALL_USERS_REQUEST,
  LIST_ALL_USERS_SUCCESS,
  LIST_ALL_USERS_FAIL,
  CHANGE_USER_ROLE_REQUEST,
  CHANGE_USER_ROLE_SUCCESS,
  CHANGE_USER_ROLE_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CLEAR_ERROR,
} from "../Constants/UserConstants";
import { axiosInstance } from "../../utils/AxiosInstance";
import { getAuthToken, saveAuthToken } from "../../utils/authTokenLocalStorage";

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axiosInstance.post(
      "api/v1/login",
      { email, password },
      config
    );

    saveAuthToken(data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = { headers: { "Content-type": "multipart/form-data" } };

    console.log(userData.get("avatar"));

    const { data } = await axiosInstance.post(
      "api/v1/register",
      userData,
      config
    );

    saveAuthToken(data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = getAuthToken();

    const { data } = await axiosInstance.get("api/v1/my-account", {
      headers: { token: token },
    });

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Logout
export const logout = () => async (dispatch) => {
  try {
    // await axiosInstance.get("/api/v1/logout");
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};

//Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/json" },
    };

    const { data } = await axiosInstance.post(
      "/api/v1/password/forgot",
      email,
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/json" },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/password/reset/${token}`,
      password,
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get All Users
export const getAllusers = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_ALL_USERS_REQUEST });

    const token = getAuthToken();

    const { data } = await axiosInstance.get("api/v1/admin/users", {
      headers: { token: token },
    });

    dispatch({
      type: LIST_ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: LIST_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Change User Role
export const changeUserRole = (id, role) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_USER_ROLE_REQUEST });

    const token = getAuthToken();
    const config = {
      headers: { "Content-type": "application/json", token },
    };

    const { data } = await axiosInstance.put(
      `api/v1/admin/user/${id}`,
      role,
      config
    );

    dispatch({
      type: CHANGE_USER_ROLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_USER_ROLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const token = getAuthToken();
    const config = {
      headers: { token },
    };

    const { data } = await axiosInstance.delete(
      `api/v1/admin/user/${id}`,
      config
    );

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
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
