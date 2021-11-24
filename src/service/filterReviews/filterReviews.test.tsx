import { RETURN_ALL, ReviewMeta, SORT_BY_AUTHOR, SORT_BY_HIGHEST, SORT_BY_LOWEST, SORT_BY_NEWEST, SORT_BY_OLDEST } from '../../lib/types';
import filterReviews from './filterReviews';

const mockReviews: ReviewMeta[] = [
	{
		id: 'id1',
		author: 'c',
		body: 'something',
		rating: 5.0,
		publish_date: '2020-01-10',
	},
	{
		id: 'id2',
		author: 'a',
		body: 'something',
		rating: 4.1,
		publish_date: '2020-01-01',
	},
	{
		id: 'id3',
		author: 'd',
		body: 'something',
		rating: 4.2,
		publish_date: '2020-01-03',
	},
	{
		id: 'id4',
		author: 'b',
		body: 'something',
		rating: 1.1,
		publish_date: '2019-01-10',
	},
];

describe('filterReviews', () => {
	it('sorts by author alphabetically', () => {
		const filteredReviews: ReviewMeta[] = filterReviews(
			mockReviews,
			SORT_BY_AUTHOR,
			RETURN_ALL
		);
		expect(filteredReviews[0].author).toBe('a');
	});

	it('sorts by highest rating', () => {
		const filteredReviews: ReviewMeta[] = filterReviews(
			mockReviews,
			SORT_BY_HIGHEST,
			RETURN_ALL
		);
		expect(filteredReviews[0].rating).toBe(5.0);
	});

	it('sorts by lowest rating', () => {
		const filteredReviews: ReviewMeta[] = filterReviews(
			mockReviews,
			SORT_BY_LOWEST,
			RETURN_ALL
		);
		expect(filteredReviews[0].rating).toBe(1.1);
	});

	it('sorts by newest reviews', () => {
		const filteredReviews: ReviewMeta[] = filterReviews(
			mockReviews,
			SORT_BY_NEWEST,
			RETURN_ALL
		);
		expect(filteredReviews[0].publish_date).toBe('2020-01-10');
	});

	it('sorts by oldest reviews', () => {
		const filteredReviews: ReviewMeta[] = filterReviews(
			mockReviews,
			SORT_BY_OLDEST,
			RETURN_ALL
		);
		expect(filteredReviews[0].publish_date).toBe('2019-01-10');
	});

	it('sorts and returns the specified count', () => {
		const filteredReviews: ReviewMeta[] = filterReviews(
			mockReviews,
			SORT_BY_OLDEST,
			'2'
		);
		expect(filteredReviews.length).toBe(2);
	});
});
