import React from "react";
import { ReviewMeta } from "../../lib/types";
import styles from "./ReviewsContent.module.css"
import Review from "../Review"


interface ReviewsContentProps {
    reviews: ReviewMeta[];
    reviewSelected: (id: string) => void
}

const ReviewsContent: React.FC<ReviewsContentProps> = ({
    reviews,
    reviewSelected
}: ReviewsContentProps) => {
    return (
        <div className={styles.reviewsContainer}>
            {reviews.map((review, index) => {
                return <Review key={index} id={review.id} rating={review.rating} body={review.body} onSelect={reviewSelected}/>
            })}
        </div>
    );
};

export default ReviewsContent;
