import axios from 'axios';
import { APIKeyHeader, ReviewMeta, ReviewResponse } from '../lib/types';

async function fetchReview(reviewId: string): Promise<ReviewResponse> {
	return axios
		.get<ReviewMeta>(`https://shakespeare.podium.com/api/reviews/${reviewId}`, {
			headers: {
				'X-API-KEY': APIKeyHeader
			}
		})
		.then((response) => ({
			review: response.data,
			statusCode: response.status,
		}));
}

export default fetchReview;
