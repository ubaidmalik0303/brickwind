import { axiosInstance } from "../../utils/AxiosInstance";
import {
  CONTACTUS_MAIL_REQUEST,
  CONTACTUS_MAIL_SUCCESS,
  CONTACTUS_MAIL_FAIL,
  CLEAR_ERROR,
} from "../Constants/ContactUsConstant";

//create category
export const contactUs = (message) => async (dispatch) => {
  try {
    dispatch({ type: CONTACTUS_MAIL_REQUEST });

    const config = {
      headers: { "Content-type": "application/json" },
    };

    const { data } = await axiosInstance.post(
      "/api/v1/contactus",
      message,
      config
    );

    dispatch({
      type: CONTACTUS_MAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTACTUS_MAIL_FAIL,
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
