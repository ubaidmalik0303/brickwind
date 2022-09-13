import React, { useEffect, useState } from "react";
import ReviewsStyles from "./reviews.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  productReviews,
  deleteProductReview,
  clearErrors,
} from "../../../store/Actions/ProductActions";
import { DELETE_REVIEW_RESET } from "../../../store/Constants/ProductConstants";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../../components/SEO/SEO";

const Reviews = () => {
  const { error, loading, reviews } = useSelector(
    (state) => state.productreviews
  );
  const {
    error: deleteError,
    loading: deleteLoading,
    isDeleted,
  } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [productId, setProductID] = useState("");

  const searchReviewsHandler = (e) => {
    e.preventDefault();
    dispatch(productReviews(productId));
  };

  const deleteReviewHandler = (reviewid) => {
    console.log(reviewid, productId);
    dispatch(deleteProductReview(reviewid, productId));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      dispatch({
        type: DELETE_REVIEW_RESET,
      });
    }
  }, [dispatch, error, alert, deleteError, isDeleted]);

  return (
    <>
      <SEO title="Reviews - BrickWind" />
      <div className={`${ReviewsStyles.reviews}`}>
        <div className="row justify-content-center py-5">
          <div className="col-md-6">
            <form onSubmit={searchReviewsHandler}>
              <h2 className="text-center">All Reviews</h2>
              <input
                type="text"
                placeholder="Product ID"
                required
                onChange={(e) => setProductID(e.target.value)}
              />
              <input type="submit" value="Search" />
            </form>
          </div>
        </div>
        {!reviews[0] ? (
          <h3 className="text-center">No Reviews</h3>
        ) : (
          <table>
            <thead>
              <tr>
                <th>REVIEW ID</th>
                <th>NAME</th>
                <th>COMMENT</th>
                <th>RATING</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {deleteLoading || loading ? (
                <SpinnerLoader />
              ) : (
                reviews?.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td>{val._id}</td>
                      <td>{val.name}</td>
                      <td>{val.comment}</td>
                      <td>{val.rating}</td>
                      <td>
                        <button
                          className={ReviewsStyles.deletebtn}
                          onClick={() => deleteReviewHandler(val._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Reviews;
