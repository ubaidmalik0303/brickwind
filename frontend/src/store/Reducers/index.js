import { combineReducers } from "redux";
import { AllProductReducer, ProductDetailsReducer } from "./ProductReducer";
import { userReducer } from "./UserReducer";
import { profileReducer } from "./ProfileReducer";

export default combineReducers({
  products: AllProductReducer,
  product: ProductDetailsReducer,
  user: userReducer,
  profile: profileReducer,
});
