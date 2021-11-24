import { useQuery } from 'react-query';
import { fetchReview } from '../../api';
import { ReviewResponse } from '../../lib/types';

// React hook used to retrieve single review
const useSingleReview = (reviewId: string): {
    // Response from API with review data
    data?: ReviewResponse;
     // If there was an error retrieving data from API
     error?: unknown;
     // Status code of the API call
     statusCode?: number;
     // Boolean to let us know the request is still in flight
     isLoading: boolean;
} => {
    const { data, error, isLoading } = useQuery(
        ["reviewId", reviewId],
        () => fetchReview(reviewId),
    )
    
    return {
        data,
        error,
        statusCode: data?.statusCode,
        isLoading,
    };
};

export default useSingleReview;
