import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import BookResult from '../../components/BookResult';

const mockStore = configureStore([]);

describe('BookResult', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    const mockBooksData = [
        { id: '1', volumeInfo: { title: 'Book 1', imageLinks: {} } },
        { id: '2', volumeInfo: { title: 'Book 2', imageLinks: {} } },
        { id: '3', volumeInfo: { title: 'Book 3', imageLinks: {} } }
    ];

    beforeEach(() => {
        store = mockStore({
            isGridViewActive: true,
            totalRecords: 24,
            selectedPage: 0,
            booksData: mockBooksData
        });
    });

    it('renders BookResult component with BookCard components in grid view', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BookResult />
            </Provider>
        );

        expect(getByText('Book 1')).toBeInTheDocument();
        expect(getByText('Book 2')).toBeInTheDocument();
        expect(getByText('Book 3')).toBeInTheDocument();
    });

    it('dispatches setSelectedPage action when pagination is changed', () => {
        const { getByRole } = render(
            <Provider store={store}>
                <BookResult />
            </Provider>
        );

        fireEvent.click(getByRole('button', { name: 'Go to page 2' }));
        const actions = store.getActions();

        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual({ type: 'set selected page', payload: 1 });
    });



    it('renders pagination with correct buttons', () => {
        const { getByRole } = render(
            <Provider store={store}>
                <BookResult />
            </Provider>
        );

        expect(getByRole('button', { name: 'Go to previous page' })).toBeInTheDocument();
        expect(getByRole('button', { name: 'Go to next page' })).toBeInTheDocument();
    });

    it('does not render BookResult component if totalRecords is 0', () => {
        store = mockStore({
            isGridViewActive: true,
            totalRecords: 0,
            selectedPage: 0,
            booksData: []
        });

        const { container } = render(
            <Provider store={store}>
                <BookResult />
            </Provider>
        );

        expect(container.firstChild).toBeNull();
    });

    it('renders BookResult component with BookCard components in grid view when booksData is not empty', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BookResult />
            </Provider>
        );

        expect(getByText('Book 1')).toBeInTheDocument();
        expect(getByText('Book 2')).toBeInTheDocument();
        expect(getByText('Book 3')).toBeInTheDocument();
    });

    it('does not render BookDetails component if isGridViewActive is true and booksData is not empty', () => {
        const { queryByText } = render(
            <Provider store={store}>
                <BookResult />
            </Provider>
        );

        expect(queryByText('Description:')).toBeNull();
    });

});
