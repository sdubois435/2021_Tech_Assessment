import { useQuery } from 'react-query';
import { fetchReview } from '../../api';
import { ReviewResponse } from '../../lib/types';

const useSingleReview = (reviewId: string): {
    data?: ReviewResponse;
    error?: unknown;
    statusCode?: number;
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
