import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../Constants/CartConstant";
import { axiosInstance } from "../../utils/AxiosInstance";

//Add To Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axiosInstance.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      category: data.product.category,
      subcategory: data.product.subcategory,
      quantity,
      createdBy: getState().user.user._id,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Remove From Cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: {
      id,
      user: getState().user.user._id,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Save Shipping Info
export const saveSippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
