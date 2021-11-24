/*
 * Component responsible to rendering a review tile on the main page.
 * When the review tile is clicked, the parents onSelect function is called to maintain its state.
 *
 * Component styles are imported from the css module in this directory.
 */

import React from "react";
import styles from "./Review.module.css";

interface ReviewProps {
  // Id of the review being rendered
  id: string;

  // Specific rating for this review
  rating: number;

  // The body or content of the review
  body: string;

  // Main pages function to maintain state of selected review
  onSelect: (id: string) => void;
}

const Review: React.FC<ReviewProps> = ({
  id,
  rating,
  body,
  onSelect,
}: ReviewProps) => {
  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div className={styles.reviewContainer} onClick={handleClick}>
      <span className={styles.ratingContainer}>{`Rating: ${rating}`}</span>
      <span className={styles.bodyContainer}>{body}</span>
    </div>
  );
};

export default Review;
