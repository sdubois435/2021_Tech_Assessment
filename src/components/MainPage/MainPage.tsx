/**
 * Main page of the UI. Presents user with a list of reviews which they can filter
 * by either a filter type (author, rating, date, etc) or by number of reviews to show
 * on the page.
 *
 * The filter type defaults to date (newest) and the count defaults to 10 reviews on the page.
 *
 * Clicking a review will open a details modal that present the user with more information
 * about the review including the author, date of the review, rating, and the full review body
 */

import React, { useState } from 'react';
import useData from '../hooks/useData';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './MainPage.module.css';
import ReviewsContent from '../ReviewsContent';
import ReviewFilter from '../Filters/ReviewFilter';
import CountFilter from '../Filters/CountFilter';
import filterReviews from '../../service/filterReviews';
import ReviewModal from '../ReviewModal';

const MainPage: React.FC = () => {
	// Maintains number of reviews to show on the page
	const [reviewCount, setReviewCount] = useState('10');

	// Maintains the type of filter being applied
	const [reviewFilterType, setReviewFilterType] = useState('date');

	// Maintains if the modal should be open or not
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Maintains the currently selected review (review ID)
	const [selectedReviewId, setSelectedReviewId] = useState('');

	// Hook call to get all reviews
	const { data, error, isLoading } = useData();

	// Filter reviews based on filter type and count state
	const filteredReviews = filterReviews(
		data?.reviews,
		reviewFilterType,
		reviewCount
	);

	/**
   * Handles logic for when a filter type is selected/changed. This function is passed to the ReviewFilter component as a prop.
   * @param type identifier for the filter type selected
   */
	const handleFilterChange = (type: string) => {
		setReviewFilterType(type);
	};

	/**
   * Handles logic for when review count is selected/changed. This function is passed to the CountFilter component as a prop.
   * @param count identifier for the count selected
   */
	const handleReviewCountChange = (count: string) => {
		setReviewCount(count);
	};

	/**
   * Handles logic for when a review is clicked.
   * Sets the selected review ID state and enables the modal to be opened
   * @param id ID of the review that was selected
   */
	const handleReviewSelected = (id: string) => {
		setSelectedReviewId(id);
		setIsModalOpen(true);
	};

	/**
   * Handles logic for when the modal is closed.
   * Set the modal open state to be false
   */
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={styles.mainContent}>
			{/* If we are still waiting for data, show a loading spinner */}
			{!(data || error) && isLoading && (
				<div
					data-testid={'MainPage.Loading.Spinner'}
					className={styles.loadingSpinnerContainer}>
					<ClipLoader size={300} />
				</div>
			)}
			{/* if there was an error calling the API for review data, tell the user */}
			{error && <span>there was an error</span>}
			{/* Once we have review data, render all the components on the page */}
			{data && (
				<div>
					{isModalOpen && (
						<ReviewModal
							reviewId={selectedReviewId}
							isOpen={isModalOpen}
							onClose={handleCloseModal}
						/>
					)}
					<div className={styles.header}>
						<h1>Shakespeare Reviews</h1>
					</div>
					<div className={styles.filterContainer}>
						<ReviewFilter onChange={handleFilterChange} />
						<CountFilter onChange={handleReviewCountChange} />
					</div>
					<ReviewsContent
						reviews={filteredReviews}
						reviewSelected={handleReviewSelected}
					/>
				</div>
			)}
		</div>
	);
};

export default MainPage;
