import { useQuery } from 'react-query';
import { fetchAllReviews } from '../../api';
import { AllReviewsResponse } from '../../lib/types';

// React hook for calling the API and getting all reviews.
const useData = (): {
    // Response from API with all review data
    data?: AllReviewsResponse;
    // If there was an error retrieving data from API
    error?: unknown;
    // Status code of the API call
    statusCode?: number;
    // Boolean to let us know the request is still in flight
    isLoading: boolean;
} => {
    // 
    const { data, error, isLoading } = useQuery(
        ["reviews"],
        () => fetchAllReviews(),
    )
    
    return {
        data,
        error,
        statusCode: data?.statusCode,
        isLoading,
    };
};

export default useData;
