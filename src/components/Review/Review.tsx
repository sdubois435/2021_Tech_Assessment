import React from "react";
import styles from './Review.module.css';

interface ReviewProps {
  id: string;
  rating: number;
  body: string;
  onSelect: (id: string) => void
}

const Review: React.FC<ReviewProps> = ({
    id,
    rating,
    body,
    onSelect
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
}

export default Review
