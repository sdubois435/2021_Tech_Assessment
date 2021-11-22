import { useQuery } from 'react-query';
import { fetchAllReviews } from '../../api';
import { AllReviewsResponse } from '../../lib/types';

const useData = (): {
    data?: AllReviewsResponse;
    error?: unknown;
    statusCode?: number;
    isLoading: boolean;
} => {
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
