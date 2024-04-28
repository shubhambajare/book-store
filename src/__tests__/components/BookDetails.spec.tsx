import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import BookDetails from '../../components/BookDetails';

const mockStore = configureStore([]);

describe('BookDetails', () => {
    let store: MockStoreEnhanced<unknown, {}>;

    beforeEach(() => {
        store = mockStore({
            selectedBook: {
                volumeInfo: {
                    title: 'Mock Title',
                    authors: ['Author 1', 'Author 2'],
                    averageRating: 4.5,
                    categories: ['Category 1', 'Category 2'],
                    publisher: 'Publisher',
                    publishedDate: '2024-04-28',
                    industryIdentifiers: [
                        { type: 'ISBN-10', identifier: '1234567890' },
                        { type: 'ISBN-13', identifier: '9876543210' }
                    ],
                    infoLink: 'https://example.com',
                    description: 'Mock Description'
                }
            }
        });
    });

    it('renders book details correctly', () => {
        const { getByText, getByAltText } = render(
            <Provider store={store}>
                <BookDetails />
            </Provider>
        );

        expect(getByAltText('Mock Title')).toBeInTheDocument();
        expect(getByText('Mock Title')).toBeInTheDocument();
        expect(getByText('Author 1 Author 2')).toBeInTheDocument();
        expect(getByText('Rating:')).toBeInTheDocument();
    });
    it('renders book details with correct categories', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BookDetails />
            </Provider>
        );

        expect(getByText('Categories:')).toBeInTheDocument();
        expect(getByText('Category 1')).toBeInTheDocument();
        expect(getByText('Category 2')).toBeInTheDocument();
    });

    it('renders book details with correct publisher', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BookDetails />
            </Provider>
        );

        expect(getByText('Publisher:')).toBeInTheDocument();
        expect(getByText('Publisher')).toBeInTheDocument();
    });

    it('renders book details with correct published date', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BookDetails />
            </Provider>
        );

        expect(getByText('Published Date:')).toBeInTheDocument();
        expect(getByText('2024-04-28')).toBeInTheDocument();
    });

    it('renders book details with correct ISBN details', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BookDetails />
            </Provider>
        );

        expect(getByText('ISBN Details:')).toBeInTheDocument();
        expect(getByText('Type: ISBN-10 Identifier: 1234567890')).toBeInTheDocument();
        expect(getByText('Type: ISBN-13 Identifier: 9876543210')).toBeInTheDocument();
    });

    it('renders book details with correct info link', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BookDetails />
            </Provider>
        );

        expect(getByText('More Details')).toBeInTheDocument();
        expect(getByText('More Details').closest('a')).toHaveAttribute('href', 'https://example.com');
    });

    it('renders book description if available', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BookDetails />
            </Provider>
        );

        expect(getByText('Description:')).toBeInTheDocument();
        expect(getByText('Mock Description')).toBeInTheDocument();
    });

    it('renders "Not Available" if book description is not provided', () => {
        store = mockStore({
            selectedBook: {
                volumeInfo: {
                    title: 'Mock Title',
                }
            }
        });

        const { getByText } = render(
            <Provider store={store}>
                <BookDetails />
            </Provider>
        );

        expect(getByText('Not Available')).toBeInTheDocument();
    });


});
