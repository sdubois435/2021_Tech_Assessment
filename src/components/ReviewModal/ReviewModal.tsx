/**
 * Tis component is responsible for rendering a modal with more details on a selected review.
 *
 * It is only opened when a review is clicked on from the main page, and can only be closed with the "close" button.
 *
 * Styles are imported from the css module in this directory
 */

import React from 'react';
import Modal from 'react-modal';
import useSingleReview from '../hooks/useSingleReview';
import styles from './ReviewModal.module.css';

interface ReviewModalProps {
  reviewId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
	// Id of the review
	reviewId,

	// Value to determine if the modal should be rendered or not
	isOpen,

	// Callback to parent function to maintain state
	onClose,
}: ReviewModalProps) => {
	// Hook for calling API to get a specific reviews based on the review ID
	const { data, error } = useSingleReview(reviewId);

	return (
		<div data-testid={'Review.Details.Modal'}>
			<Modal
				ariaHideApp={false}
				shouldCloseOnOverlayClick={false}
				isOpen={isOpen}
				contentLabel="Review Modal"
				className={styles.modal}
				onRequestClose={() => {
					onClose();
				}}>
				{/* If there was an error calling the API, tell the user there was an error */}
				{error && <span>there was an error getting review data </span>}
				{/* Once we have data, render the modal content */}
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
									data.review.publish_date.split('T')[0]
								} by ${data.review.author}`}</span>
							)}
						</div>
						<div className={styles.body}>
							<p>{data.review.body}</p>
						</div>
						<div className={styles.buttonContainer} data-testid={'Review.Details.Modal.Close'}>
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
