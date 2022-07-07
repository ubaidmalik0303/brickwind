import {
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
} from "../Constants/ProductConstants";
import axios from "axios";
import { axiosInstance } from "../../utils/axiosInstance";

//Get All Products
export const getProducts =
  (keyword = "", currentPage = 1, price = [0, 200000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCTS_REQUEST,
      });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axiosInstance.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Get Product Detail
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axiosInstance.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
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
