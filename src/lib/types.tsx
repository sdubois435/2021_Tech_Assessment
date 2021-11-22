/* eslint-disable camelcase */
export interface ReviewMeta {
  rating: number;
  publish_date: string;
  id: string;
  body: string;
  author: string;
}

export interface AllReviewsResponse {
  reviews: ReviewMeta[];
  statusCode: number;
}

export interface ReviewResponse {
  review: ReviewMeta;
  statusCode: number;
}

export const APIKeyHeader: string = "H3TM28wjL8R4#HTnqk?c";
