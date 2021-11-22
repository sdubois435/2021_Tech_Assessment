import React, { useState } from "react";
import useData from "../hooks/useData";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./MainPage.module.css";
import ReviewsContent from "../ReviewsContent";
import ReviewFilter from "../Filters/ReviewFilter";
import CountFilter from "../Filters/CountFilter";
import filterReviews from "../../service/filterReviews";
import ReviewModal from "../ReviewModal";

const MainPage: React.FC = () => {
  const [reviewCount, setReviewCount] = useState("10");
  const [reviewFilterType, setReviewFilterType] = useState("date");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReviewId, setSelectedReviewId] = useState("")

  const { data, error, isLoading } = useData();

  const filteredReviews = filterReviews(
    data?.reviews,
    reviewFilterType,
    reviewCount
  );

  const handleFilterChange = (type: string) => {
    setReviewFilterType(type);
  };

  const handleReviewCountChange = (count: string) => {
    setReviewCount(count);
  };

  const handleReviewSelected = (id: string) => {
    setSelectedReviewId(id);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={styles.mainContent}>
      {!(data || error) && isLoading && (
        <div className={styles.loadingSpinnerContainer}>
          <ClipLoader size={300} />
        </div>
      )}
      {error && <span>there was an error</span>}
      {data && (
        <div>
          <ReviewModal reviewId={selectedReviewId} isOpen={isModalOpen} onClose={handleCloseModal}/>
          <div className={styles.header}>
            <h1>Shakespear Reviews</h1>
          </div>
          <div className={styles.filterContainer}>
            <ReviewFilter onChange={handleFilterChange} />
            <CountFilter onChange={handleReviewCountChange} />
          </div>
          <ReviewsContent reviews={filteredReviews}  reviewSelected={handleReviewSelected}/>
        </div>
      )}
    </div>
  );
};

export default MainPage;
