/**
 * This file contains all the interfaces and constants that are used throughout the UI.
 */

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

export const SORT_BY_AUTHOR = "By Author";
export const SORT_BY_NEWEST = "By Date (newest)";
export const SORT_BY_OLDEST = "By Date (oldest)";
export const SORT_BY_HIGHEST = "By Rating (high to low)";
export const SORT_BY_LOWEST = "By Rating (low to high)";
export const RETURN_ALL = "all";
