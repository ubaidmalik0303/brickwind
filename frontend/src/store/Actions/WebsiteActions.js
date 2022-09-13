import {
  CHANGE_WEBSITE_DETAILS_REQUEST,
  CHANGE_WEBSITE_DETAILS_SUCCESS,
  CHANGE_WEBSITE_DETAILS_FAIL,
  WEBSITE_DETAILS_REQUEST,
  WEBSITE_DETAILS_SUCCESS,
  WEBSITE_DETAILS_FAIL,
  CLEAR_ERROR,
} from "../Constants/WebsiteConstant";
import { axiosInstance } from "../../utils/AxiosInstance";
import { getAuthToken } from "../../utils/authTokenLocalStorage";

//Update Website Details
export const updateWebsiteDetails = (websiteDetails) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_WEBSITE_DETAILS_REQUEST });

    const token = getAuthToken();

    const config = {
      headers: { "Content-type": "multipart/form-data", token },
    };

    const { data } = await axiosInstance.post(
      "/api/v1/admin/website",
      websiteDetails,
      config
    );

    dispatch({
      type: CHANGE_WEBSITE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_WEBSITE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Website Details
export const getWebsiteDetails = () => async (dispatch) => {
  try {
    dispatch({ type: WEBSITE_DETAILS_REQUEST });

    const token = getAuthToken();

    const config = {
      headers: { token },
    };

    const { data } = await axiosInstance.get("/api/v1/admin/website", config);

    dispatch({
      type: WEBSITE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WEBSITE_DETAILS_FAIL,
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
