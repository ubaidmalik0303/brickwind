import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_SUBCATEGORY_REQUEST,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
  CLEAR_ERROR,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
} from "../Constants/CategoryConstant";
import { axiosInstance } from "../../utils/AxiosInstance";
import { getAuthToken } from "../../utils/authTokenLocalStorage";

//create category
export const createCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    const token = getAuthToken();

    const config = {
      headers: { "Content-type": "multipart/form-data", token },
    };

    const { data } = await axiosInstance.post(
      "/api/v1/admin/category/new",
      category,
      config
    );

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update category
export const updateCategory = (id, category) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const token = getAuthToken();

    const config = {
      headers: { "Content-type": "multipart/form-data", token },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/admin/category/${id}`,
      category,
      config
    );

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const token = getAuthToken();

    const config = {
      headers: { token },
    };

    const { data } = await axiosInstance.delete(
      `/api/v1/admin/category/${id}`,
      config
    );

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//create sub-category
export const createSubCategory = (category, id) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SUBCATEGORY_REQUEST });

    const token = getAuthToken();

    const config = {
      headers: { "Content-type": "application/json", token },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/admin/subcategory/new/${id}`,
      { name: category },
      config
    );

    dispatch({
      type: CREATE_SUBCATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SUBCATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get All Categories
export const allCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_CATEGORIES_REQUEST,
    });

    const { data } = await axiosInstance.get("api/v1/categories");

    dispatch({
      type: ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

//category Details
export const categoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DETAILS_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: { token },
    };
    const { data } = await axiosInstance.get(
      `api/v1/admin/category/${id}`,
      config
    );

    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
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
