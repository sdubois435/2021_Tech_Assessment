/**
 * This service function handles all the filtering of the reviews, based on the filters the user has selected
 */

import { RETURN_ALL, ReviewMeta, SORT_BY_AUTHOR, SORT_BY_HIGHEST, SORT_BY_LOWEST, SORT_BY_NEWEST, SORT_BY_OLDEST } from "../../lib/types";

export function filterReviews(reviews: ReviewMeta[] | undefined, filterType: string, reviewCount: string): ReviewMeta[] {
    if (!reviews) {
        return []; 
    }

    // Switch sorting logic based on the filter selected by the user
    switch (filterType) {
        case SORT_BY_NEWEST: {
            reviews.sort((a, b) => {
                if (a.publish_date > b.publish_date) {
                    return -1;
                }
                if (a.publish_date < b.publish_date) {
                    return 1;
                }
                return 0;
            });
            break;
        }
        case SORT_BY_OLDEST: {
            reviews.sort((a, b) => {
                if (b.publish_date > a.publish_date) {
                    return -1;
                }
                if (b.publish_date < a.publish_date) {
                    return 1;
                }
                return 0;
            });
            break;
        }
        case SORT_BY_AUTHOR: {
           reviews.sort((a, b) => {
                if (a.author < b.author) {
                    return -1;
                }
                if (a.author > b.author) {
                    return 1;
                }
                return 0;
            });
            break;
        }
        case SORT_BY_HIGHEST: {
            reviews.sort((a, b) => {
                return b.rating - a.rating;
            });
            break;
        }
        case SORT_BY_LOWEST: {
            reviews.sort((a, b) => {
                return a.rating - b.rating;
            });
            break;
        }
    };

    // If user wants to see a specific number of reviews on the page, we only take the first n items.
    // n is the count filter the user selected
    if (reviewCount !== RETURN_ALL) {
        return reviews.slice(0, +reviewCount);
    }
    return reviews;
}

export default filterReviews
