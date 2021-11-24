import { fireEvent, render, screen } from '@testing-library/react';
import ReviewFilter from './ReviewFilter';

const mockOnChange = jest.fn();

describe('ReviewFilter', () => {
	test('default option is By Date (newest)', () => {
		render(<ReviewFilter onChange={mockOnChange} />);
		expect(screen.getByText('By Date (newest)')).toBeInTheDocument;
	});

	it('changes values when a new filter is selected', async () => {
		render(<ReviewFilter onChange={mockOnChange} />);
		const dropdown = screen.getByTestId('ReviewFilter.Dropdown').children[0]
			.children[0];

		fireEvent.mouseDown(dropdown);

		const option = screen.getByText('By Author');

		fireEvent.mouseDown(option);

		expect(mockOnChange).toBeCalledTimes(1);
		expect(mockOnChange).toHaveBeenCalledWith('By Author');
	});
});
