import { combineReducers } from "redux";
import {
  AllProductReducer,
  ProductDetailsReducer,
  createProductReducer,
  productReducer,
  searchProductReducer,
  newReviewReducer,
  productReviewsReducer,
  reviewReducer,
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
  categoryDetailsReducer,
  categoryReducer,
  createCategoryReducer,
  createSubCategoryReducer,
} from "./CategoryReducer";
import { cartReducer } from "./CartReducer";
import { getWishlistReducer, wishlistReducer } from "./WishlistReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  ordersReducer,
} from "./OrderReducer";
import {
  getWebsiteDetailsReducer,
  websiteDetailsReducer,
} from "./WebsiteReducer/WebsiteReducer";
import { contactUsReducer } from "./ContactUsReducer";

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
  category: categoryReducer,
  categorydetails: categoryDetailsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  getwishlist: getWishlistReducer,
  neworder: newOrderReducer,
  myorders: myOrdersReducer,
  orderdetails: orderDetailsReducer,
  allorders: allOrdersReducer,
  order: ordersReducer,
  newreview: newReviewReducer,
  productreviews: productReviewsReducer,
  review: reviewReducer,
  websitedetails: websiteDetailsReducer,
  getwebsitedetails: getWebsiteDetailsReducer,
  contactus: contactUsReducer,
});
