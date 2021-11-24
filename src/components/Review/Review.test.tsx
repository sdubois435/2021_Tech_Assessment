import {screen, fireEvent, render } from '@testing-library/react'
import Review from './Review';

const mockOnSelect = jest.fn();

describe('Review', () => {
    it('renders a review tile', () => {
        render(<Review id="id1" rating={1.1} body="body 1" onSelect={mockOnSelect} />)

        expect(screen.getByText('body 1')).toBeInTheDocument();
        expect(screen.getByText('Rating: 1.1')).toBeInTheDocument();
    });
    
    it('calls onSelect when clicked', () => {
        render(<Review id="id1" rating={1.0} body="body 1" onSelect={mockOnSelect} />)

        const reviewTile = screen.getByText('body 1')

        fireEvent.click(reviewTile)

        expect(mockOnSelect).toHaveBeenCalledTimes(1)
        expect(mockOnSelect).toHaveBeenCalledWith('id1')
    });
});
