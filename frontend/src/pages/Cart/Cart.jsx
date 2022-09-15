import React from "react";
import CartStyles from "./cart.module.css";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import { FiX, FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeItemFromCart,
} from "../../store/Actions/CartActions";
import SEO from "../../components/SEO/SEO";

const Cart = () => {
  const stringShort = (string) => {
    const newStr = string.slice(0, 50);
    return newStr + ".....";
  };

  const dispatch = useDispatch();
  let { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  cartItems = cartItems.filter((val) => val.createdBy === user._id);

  const handleQuantityChange = (e, id) => {
    let newQuantity = e.target.value;
    dispatch(addItemsToCart(id, newQuantity));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <>
      <SEO title="Cart - BrickWind" />
      <BreadCrumb name="CART" breadcrumbpath=" > Cart" />
      <div className={`container-fluid ${CartStyles.cart} p-3 p-md-5`}>
        {!cartItems[0] ? (
          <div className="container text-center">
            <FiShoppingCart size={100} />
            <h4 className="my-4">Your Cart Is Empty!</h4>
            <Link to="/store">View Products</Link>
          </div>
        ) : (
          <>
            <h1 className="mt-4 mb-5">My Shopping Cart</h1>
            <table>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>STOCK STATUS</th>
                  <th>Quantity</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <div>
                          <img src={val.image} alt={val?.name} />
                          <FiX
                            color="black"
                            size={20}
                            onClick={() => handleRemoveItem(val.product)}
                          />
                        </div>
                        <p>{stringShort(val.name)}</p>
                      </td>
                      <td>
                        <span className={CartStyles.mobileheading}>PRICE:</span>
                        <span>${val.price}</span>
                      </td>
                      <td>
                        <span className={CartStyles.mobileheading}>
                          STOCK STATUS:
                        </span>
                        <span>
                          {val.stock > 0
                            ? val.stock < 10
                              ? `Only ${val.stock} Items Left`
                              : "In Stock"
                            : "Out Of Stock"}
                        </span>
                      </td>
                      <td>
                        <span className={CartStyles.mobileheading}>
                          QUANTITY:
                        </span>
                        <input
                          onChange={(e) => handleQuantityChange(e, val.product)}
                          type="number"
                          defaultValue={val.quantity}
                          min={1}
                          max={val.stock}
                        />
                      </td>
                      <td>
                        <span className={CartStyles.mobileheading}>TOTAL:</span>
                        <span>${val.price * val.quantity}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={`${CartStyles.cartBottom} px-3 px-md-5`}>
              <h4>
                Total: $
                {cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}
              </h4>
              <Link to="/my-account/shipping">Checkout</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
