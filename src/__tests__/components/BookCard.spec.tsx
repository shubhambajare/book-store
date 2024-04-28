import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import BookCard from '../../components/BookCard';


const mockStore = configureStore([]);

describe('BookCard', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    const mockBook = {
        id: '1',
        volumeInfo: {
            title: 'Mock Title',
            authors: ['Author 1', 'Author 2'],
            averageRating: 4.5,
            categories: ['Category 1', 'Category 2'],
            publisher: 'Publisher',
            ratingsCount: 1,
            publishedDate: '2024-04-28',
            industryIdentifiers: [
                { type: 'ISBN-10', identifier: '1234567890' },
                { type: 'ISBN-13', identifier: '9876543210' }
            ],
            infoLink: 'https://example.com',
            description: 'Mock Description',
            imageLinks: {
                thumbnail: 'mock-thumbnail-url'
            }
        }
    };

    beforeEach(() => {
        store = mockStore({});
    });

    it('renders book card with correct title and authors', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BookCard book={mockBook} />
            </Provider>
        );

        expect(getByText('Mock Title')).toBeInTheDocument();
        expect(getByText('Author 1')).toBeInTheDocument();
        expect(getByText('Author 2')).toBeInTheDocument();
    });

    it('truncates long titles with ellipsis', () => {
        const longTitleBook = {
            ...mockBook,
            volumeInfo: {
                ...mockBook.volumeInfo,
                title: 'This is a very long title that should be truncated with ellipsis'
            }
        };

        const { getByText } = render(
            <Provider store={store}>
                <BookCard book={longTitleBook} />
            </Provider>
        );

        expect(getByText('This is a very long title that should be...')).toBeInTheDocument();
    });

    it('dispatches setSelectedBook action when card is clicked', () => {
        const { getByRole } = render(
            <Provider store={store}>
                <BookCard book={mockBook} />
            </Provider>
        );

        fireEvent.click(getByRole('button', { name: 'Show Details' }));
        const actions = store.getActions();

        expect(actions).toHaveLength(2);
        expect(actions[0]).toEqual({ type: 'set selected book', payload: mockBook });
    });

    it('renders book card with "Show Details" button', () => {
        const { getByRole } = render(
            <Provider store={store}>
                <BookCard book={mockBook} />
            </Provider>
        );

        expect(getByRole('button', { name: 'Show Details' })).toBeInTheDocument();
    });

    it('truncates long titles correctly', () => {
        const longTitleBook = {
            ...mockBook,
            volumeInfo: {
                ...mockBook.volumeInfo,
                title: 'This is a very long title that should be truncated with ellipsis'
            }
        };

        const { getByText } = render(
            <Provider store={store}>
                <BookCard book={longTitleBook} />
            </Provider>
        );

        expect(getByText('This is a very long title that should be...')).toBeInTheDocument();
    });
});
