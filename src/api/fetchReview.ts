import axios from "axios";
import { APIKeyHeader, ReviewResponse } from "../lib/types";

async function fetchReview(reviewId: string): Promise<ReviewResponse> {
  return axios
    .get(`https://shakespeare.podium.com/api/reviews/${reviewId}`, {
      headers: {
        "X-API-KEY": APIKeyHeader
      }
    })
    .then((response) => ({
      review: response.data,
      statusCode: response.status,
    }));
}

export default fetchReview;
