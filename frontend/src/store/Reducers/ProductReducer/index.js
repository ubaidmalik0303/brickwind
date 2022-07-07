import {
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
} from "../../Constants/ProductConstants";

export const AllProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const ProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
