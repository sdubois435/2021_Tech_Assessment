import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import ReviewModal from './ReviewModal';
import axios from 'axios';
import { ReviewMeta } from '../../lib/types';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockModal = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity,
				refetchOnWindowFocus: false,
				refetchOnReconnect: false,
				refetchInterval: false,
				retry: false,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<ReviewModal reviewId="id1" isOpen onClose={mockOnClose} />
		</QueryClientProvider>
	);
};

const mockSingleReturn: ReviewMeta = {
	id: 'id1',
	rating: 2.1,
	author: 'aa',
	publish_date: 'time',
	body: 'body',
};

jest.mock('axios', () => ({
	get: jest.fn(),
}));

const mockOnClose = jest.fn();

describe('ReviewModal', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	test('content is rendered', async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: mockSingleReturn,
		});

		render(mockModal());

		await waitFor(() => {
			expect(screen.getByText('Close')).toBeInTheDocument();
		});

		expect(screen.getByText('body')).toBeInTheDocument();
		expect(screen.getByText('This review was written on time by aa'));
	});

	test('onClose is called when the Close button is clicked', async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: mockSingleReturn,
		});

		render(mockModal());

		await waitFor(() => {
			expect(screen.getByText('Close')).toBeInTheDocument();
		});

		const closeButton = screen.getByText('Close');
		fireEvent.click(closeButton);

		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it('removes time portion of post data', async () => {
		mockSingleReturn.publish_date = 'bbTcc';
		(axios.get as jest.Mock).mockResolvedValue({
			data: mockSingleReturn,
		});

		render(mockModal());

		await waitFor(() => {
			expect(screen.getByText('Close')).toBeInTheDocument();
		});

		expect(screen.getByText('This review was written on bb by aa'));
	});
});
