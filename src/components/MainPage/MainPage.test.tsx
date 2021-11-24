import {
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import MainPage from './MainPage';
import { ReviewMeta } from '../../lib/types';

const mockMainPage = () => {
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
			<MainPage />
		</QueryClientProvider>
	);
};

const mockAllReturn: ReviewMeta[] = [
	{
		rating: 1.0,
		publish_date: '2020-01-01',
		id: 'id1',
		body: 'some body 1',
		author: 'auth1',
	},
	{
		rating: 1.1,
		publish_date: '2020-01-02',
		id: 'id2',
		body: 'some body 2',
		author: 'auth2',
	},
	{
		rating: 1.2,
		publish_date: '2020-01-03',
		id: 'id3',
		body: 'some body 3',
		author: 'auth3',
	},
	{
		rating: 1.3,
		publish_date: '2020-01-04',
		id: 'id4',
		body: 'some body 4',
		author: 'auth4',
	},
	{
		rating: 1.4,
		publish_date: '2020-01-05',
		id: 'id5',
		body: 'some body 5',
		author: 'auth5',
	},
];

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

describe('MainPage', () => {
	test('it renders', async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: mockAllReturn,
		});

		render(mockMainPage());

		await waitFor(() => {
			expect(
				screen.queryByTestId('MainPage.Loading.Spinner')
			).not.toBeInTheDocument();
		});
	});

	test('reviews are rendered', async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: mockAllReturn,
		});
		render(mockMainPage());

		await waitFor(() => {
			expect(
				screen.queryByTestId('MainPage.Loading.Spinner')
			).not.toBeInTheDocument();
		});

		expect(screen.getByText('some body 1')).toBeInTheDocument();
	});

	it('renders error message when there is an API error', async () => {
		(axios.get as jest.Mock).mockRejectedValue(new Error('API error'));
		render(mockMainPage());

		await waitFor(() => {
			expect(
				screen.queryByTestId('MainPage.Loading.Spinner')
			).not.toBeInTheDocument();
		});

		expect(screen.getByText('there was an error')).toBeInTheDocument();
	});

	test('the details modal renders when a review tile is clicked', async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: mockAllReturn,
		});

		render(mockMainPage());

		await waitFor(() => {
			expect(
				screen.queryByTestId('MainPage.Loading.Spinner')
			).not.toBeInTheDocument();
		});

		const reviewTile = screen.getByText('some body 1');
		fireEvent.click(reviewTile);

		expect(screen.getByTestId('Review.Details.Modal')).toBeInTheDocument();
	});

	test('the details modal closes when the close button is clicked', async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: mockAllReturn,
		});

		render(mockMainPage());

		await waitFor(() => {
			expect(
				screen.queryByTestId('MainPage.Loading.Spinner')
			).not.toBeInTheDocument();
		});

		(axios.get as jest.Mock).mockResolvedValue({
			data: mockSingleReturn,
		});

		const reviewTile = screen.getByText('some body 1');
		fireEvent.click(reviewTile);

		const modal = screen.getByTestId('Review.Details.Modal');

		expect(modal).toBeInTheDocument();

		await waitFor(() => {
			const closeButton = screen.getByText('Close');
			expect(closeButton).toBeInTheDocument();
			fireEvent.click(closeButton);
		});

		expect(
			screen.queryByTestId('Review.Details.Modal')
		).not.toBeInTheDocument();
	});
});
