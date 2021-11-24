import { screen, render, fireEvent } from "@testing-library/react";
import { ReviewMeta } from "../../lib/types";
import ReviewsContent from "./ReviewsContent";

const mockOnSelect = jest.fn();

const mockReviews: ReviewMeta[] = [
  { id: "id1", author: "a1", body: "b1", publish_date: "date", rating: 2.2 },
  { id: "id2", author: "a2", body: "b2", publish_date: "date", rating: 1.2 },
  { id: "id3", author: "a3", body: "b3", publish_date: "date", rating: 3.2 },
];

describe('ReviewsContent', () => {
    it('renders all the provided reviews', () => {
        render(<ReviewsContent reviews={mockReviews} reviewSelected={mockOnSelect} />)
        expect(screen.getByText('b1')).toBeInTheDocument();
        expect(screen.getByText('b2')).toBeInTheDocument();
        expect(screen.getByText('b3')).toBeInTheDocument();
    });

    test('on select is called when a review tile is clicked', () => {
        render(<ReviewsContent reviews={mockReviews} reviewSelected={mockOnSelect} />)
        const tile = screen.getByText('b2');
        fireEvent.click(tile);
        
        expect(mockOnSelect).toHaveBeenCalledTimes(1);
        expect(mockOnSelect).toHaveBeenCalledWith('id2')
    });
});
