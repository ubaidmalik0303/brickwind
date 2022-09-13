import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  CLEAR_ERROR,
} from "../Constants/OrderConstant";
import { getAuthToken } from "../../utils/authTokenLocalStorage";
import { axiosInstance } from "../../utils/AxiosInstance";
import { GET_CART_ITEMS } from "../Constants/CartConstant";

//create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: {
        "Content-type": "application/json",
        token,
      },
    };

    const { data } = await axiosInstance.post(
      "/api/v1/order/new",
      order,
      config
    );

    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const deleteCart = cartItems.filter((item) => {
      return item.createdBy !== getState().user.user._id;
    });
    localStorage.setItem("cartItems", JSON.stringify(deleteCart));
    dispatch({
      type: GET_CART_ITEMS,
    });

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//my orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_ORDERS_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: {
        token,
      },
    };

    const { data } = await axiosInstance.get("/api/v1/orders/my", config);

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//order details
export const orderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: {
        token,
      },
    };

    const { data } = await axiosInstance.get(`/api/v1/order/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//all Orders Admin
export const allOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_ORDERS_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: {
        token,
      },
    };

    const { data } = await axiosInstance.get("/api/v1/admin/orders", config);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update order admin
export const updateOrder = (id, order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_ORDER_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: {
        "Content-type": "application/json",
        token,
      },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete order admin
export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ORDER_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: {
        token,
      },
    };

    const { data } = await axiosInstance.delete(
      `/api/v1/admin/order/${id}`,
      config
    );

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
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
