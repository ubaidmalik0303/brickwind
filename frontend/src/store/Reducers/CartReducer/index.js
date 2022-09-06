import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  GET_CART_ITEMS,
} from "../../Constants/CartConstant";

const cartInititalState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartReducer = (state = cartInititalState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i?.product === item?.product && i?.createdBy === item?.createdBy
      );
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i?.product === isItemExist?.product &&
            i?.createdBy === isItemExist?.createdBy
              ? item
              : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      const forDeleteItem = state.cartItems.map((i, index) => {
        if (
          i.product === action.payload.id &&
          i?.createdBy === action.payload.user
        ) {
          return "";
        }
        return i;
      });
      return {
        ...state,
        cartItems: forDeleteItem.filter((item) => item !== ""),
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};
