import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_RESET,
  CREATE_SUBCATEGORY_REQUEST,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_FAIL,
  CREATE_SUBCATEGORY_RESET,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
  CLEAR_ERROR,
} from "../../Constants/CategoryConstant";

export const createCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        category: action.payload.category,
      };
    case CREATE_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_CATEGORY_RESET:
      return {
        ...state,
        success: false,
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

export const createSubCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CREATE_SUBCATEGORY_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CREATE_SUBCATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        category: action.payload.category,
      };
    case CREATE_SUBCATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_SUBCATEGORY_RESET:
      return {
        ...state,
        success: false,
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

export const allCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ALL_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload.categories,
      };
    case ALL_CATEGORIES_FAIL:
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
