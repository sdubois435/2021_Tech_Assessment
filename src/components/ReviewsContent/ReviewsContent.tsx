/**
 * This component is responsible for containing all the reviews.
 * 
 * The reviews that are rendered are passed in as a prop from the main page.
 * 
 * The reviews provided are already filtered based on the filters the user has selected.
 */

import React from "react";
import { ReviewMeta } from "../../lib/types";
import styles from "./ReviewsContent.module.css"
import Review from "../Review"


interface ReviewsContentProps {
    // List of all the reviews from the API, that have gone through filtering.
    reviews: ReviewMeta[];

    // Callback to main page to maintain state
    reviewSelected: (id: string) => void
}

const ReviewsContent: React.FC<ReviewsContentProps> = ({
    reviews,
    reviewSelected
}: ReviewsContentProps) => {
    return (
        <div className={styles.reviewsContainer}>
            {reviews.map((review, index) => {
                // Return a Review for each review that was passed in as a prop
                return <Review key={index} id={review.id} rating={review.rating} body={review.body} onSelect={reviewSelected}/>
            })}
        </div>
    );
};

export default ReviewsContent;
