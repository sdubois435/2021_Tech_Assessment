import axios from "axios";
import { APIKeyHeader, AllReviewsResponse } from "../lib/types";

async function fetchAllReviews(): Promise<AllReviewsResponse> {
  return axios
    .get(`https://shakespeare.podium.com/api/reviews`, {
      headers: {
        "X-API-KEY": APIKeyHeader,
      },
    })
    .then((response) => {
      return {
        reviews: response.data,
        statusCode: response.status,
      };
    });
}

export default fetchAllReviews;
