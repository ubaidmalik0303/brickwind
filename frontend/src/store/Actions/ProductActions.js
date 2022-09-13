import {
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CLEAR_ERROR,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  ALL_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../Constants/ProductConstants";
import { axiosInstance } from "../../utils/AxiosInstance";
import { getAuthToken } from "../../utils/authTokenLocalStorage";

//Get All Products
export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 200000],
    category,
    subcategory,
    rating = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCTS_REQUEST,
      });

      if (keyword) {
        dispatch({
          type: SEARCH_PRODUCTS_REQUEST,
        });
      }

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }

      if (subcategory) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&subcategory=${subcategory}&ratings[gte]=${rating}`;
      }

      const { data } = await axiosInstance.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });

      if (keyword) {
        dispatch({
          type: SEARCH_PRODUCTS_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });

      if (keyword) {
        dispatch({
          type: SEARCH_PRODUCTS_FAIL,
        });
      }
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

//create product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const token = getAuthToken();

    const config = {
      headers: { "Content-type": "multipart/form-data", token },
    };

    const { data } = await axiosInstance.post(
      "/api/v1/admin/product/new",
      productData,
      config
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Admin Products
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCTS_REQUEST,
    });

    const token = getAuthToken();

    const { data } = await axiosInstance.get("api/v1/admin/products", {
      headers: { token: token },
    });

    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const token = getAuthToken();

    const config = {
      headers: { token },
    };

    const { data } = await axiosInstance.delete(
      `/api/v1/admin/product/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const token = getAuthToken();

    const config = {
      headers: { "Content-type": "application/json", token },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/admin/product/update/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//New Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: { "Content-type": "application/json", token },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/reviews`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Product Reviews
export const productReviews = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_REVIEWS_REQUEST,
    });

    const token = getAuthToken();

    const config = {
      headers: { token },
    };

    const { data } = await axiosInstance.get(
      `/api/v1/reviews?id=${id}`,
      config
    );

    dispatch({
      type: ALL_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete Product Review
export const deleteProductReview =
  (reviewid, productId) => async (dispatch) => {
    try {
      dispatch({
        type: DELETE_REVIEW_REQUEST,
      });

      const token = getAuthToken();

      const config = {
        headers: { token },
      };

      const { data } = await axiosInstance.delete(
        `/api/v1/reviews?id=${reviewid}&productId=${productId}`,
        config
      );

      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
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
