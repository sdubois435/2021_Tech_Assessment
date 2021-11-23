import React from "react";
import Modal from "react-modal";
import useSingleReview from "../hooks/useSingleReview";
import styles from "./ReviewModal.module.css";

interface ReviewModalProps {
  reviewId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  reviewId,
  isOpen,
  onClose,
}: ReviewModalProps) => {
  const { data, error } = useSingleReview(reviewId);

  return (
    <div>
      <Modal
        shouldCloseOnOverlayClick={false}
        isOpen={isOpen}
        contentLabel="Review Modal"
        className={styles.modal}
        onRequestClose={() => {
          onClose();
        }}>
        {error && <span>there was an error getting review data </span>}
        {data && (
          <>
            <div>
              <h2>Review Details</h2>
            </div>
            <div className={styles.rating}>
              <span>{`Rating: ${data.review.rating}`}</span>
            </div>
            <div className={styles.author}>
              {data.review.publish_date && (
                <span>{`This review was written on ${
                  data.review.publish_date.split("T")[0]
                } by ${data.review.author}`}</span>
              )}
            </div>
            <div className={styles.body}>
              <p>{data.review.body}</p>
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={() => {
                  onClose();
                }}>
                Close
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ReviewModal;
