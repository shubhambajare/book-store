import { getBooks } from '../../api/BooksApi';

describe('getBooks function', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('returns empty array if search query is empty', async () => {
        const result = await getBooks('');
        expect(result.totalItems).toBe(0);
        expect(result.items).toEqual([]);
    });

    test('fetches books data for valid search query', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () =>
                Promise.resolve({
                    totalItems: 2,
                    items: [{ id: '1', volumeInfo: { title: 'Book 1' } }, { id: '2', volumeInfo: { title: 'Book 2' } }],
                }),
        });

        const result = await getBooks('water and sun');
        expect(result.totalItems).toBe(2);
        expect(result.items.length).toBe(2);
        expect(result.items[0].volumeInfo.title).toBe('Book 1');
        expect(result.items[1].volumeInfo.title).toBe('Book 2');
    });

    test('handles error if fetch fails', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Fetch failed'));

        await expect(getBooks('water and sun')).rejects.toThrowError('Fetch failed');
    });

    test('correctly constructs URL with search query and page', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({ totalItems: 0, items: [] }),
        });

        await getBooks('water and sun', 1);
        expect(global.fetch).toHaveBeenCalledWith(
            'https://www.googleapis.com/books/v1/volumes?q=water+and+sun&startIndex=8&maxResults=8'
        );
    });
});

