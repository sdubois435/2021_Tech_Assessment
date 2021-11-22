import { ReviewMeta } from "../../lib/types";


export function filterReviews(reviews: ReviewMeta[] | undefined, filterType: string, reviewCount: string): ReviewMeta[] {
    if (!reviews) {
        return []; 
    }

    switch (filterType) {
        case "By Date (newest)": {
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
        case "By Date (oldest)": {
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
        case "By Author": {
           reviews.sort((a, b) => {
                if (a.author > b.author) {
                    return -1;
                }
                if (a.author < b.author) {
                    return 1;
                }
                return 0;
            });
            break;
        }
        case "By Rating (high to low)": {
            reviews.sort((a, b) => {
                return b.rating - a.rating;
            });
            break;
        }
        case "By Rating (low to high)": {
            reviews.sort((a, b) => {
                return a.rating - b.rating;
            });
            break;
        }
    };
    if (reviewCount !== "all") {
        return reviews.slice(0, +reviewCount);
    }
    return reviews;
}

export default filterReviews
