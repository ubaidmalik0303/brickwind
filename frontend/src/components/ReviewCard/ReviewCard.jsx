import React from "react";
import ReactStars from "react-rating-stars-component";
import ReviewCardStyles from "./ReviewCard.module.css";

const ReviewCard = ({ data }) => {
  return (
    <div className={`${ReviewCardStyles.reviewcard} shadow`}>
      <span>{data?.name}</span>
      <ReactStars edit={false} count={5} value={data?.rating} />
      <p>{data?.comment}</p>
    </div>
  );
};

export default ReviewCard;
