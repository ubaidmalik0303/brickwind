import { combineReducers } from "redux";
import {
  AllProductReducer,
  ProductDetailsReducer,
  createProductReducer,
  productReducer,
  searchProductReducer,
  newReviewReducer,
} from "./ProductReducer";
import {
  userReducer,
  forgotpasswordReducer,
  listAllUsers,
  adminUserReducer,
} from "./UserReducer";
import { profileReducer } from "./ProfileReducer";
import {
  allCategoriesReducer,
  createCategoryReducer,
  createSubCategoryReducer,
} from "./CategoryReducer";
import { cartReducer } from "./CartReducer";
import { getWishlistReducer, wishlistReducer } from "./WishlistReducer";
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./OrderReducer";

export default combineReducers({
  products: AllProductReducer,
  searchproduct: searchProductReducer,
  productDetails: ProductDetailsReducer,
  user: userReducer,
  adminuser: adminUserReducer,
  allusers: listAllUsers,
  profile: profileReducer,
  forgotpassword: forgotpasswordReducer,
  createproduct: createProductReducer,
  product: productReducer,
  createcategory: createCategoryReducer,
  createsubcategory: createSubCategoryReducer,
  categories: allCategoriesReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  getwishlist: getWishlistReducer,
  neworder: newOrderReducer,
  myorders: myOrdersReducer,
  orderdetails: orderDetailsReducer,
  newreview: newReviewReducer,
});
