import { BookReducer } from '../../store/reducers/BookReducer';
import {
    SET_BOOKS_DATA,
    SET_IS_GRID_VIEW_ACTIVE,
    SET_SEARCH_QUERY,
    SET_SELECTED_BOOK,
    SET_SELECTED_PAGE,
    SET_TOTAL_RECORDS,
} from '../../store/actions/BookActions';

describe('BookReducer', () => {
    const initialState = {
        isGridViewActive: true,
        totalRecords: 0,
        selectedPage: 0,
        searchQuery: '',
        selectedBook: null,
        booksData: [],
    };

    test('should return the initial state', () => {
        expect(BookReducer(undefined, { type: '', payload: '' })).toEqual(initialState);
    });

    test('should handle SET_IS_GRID_VIEW_ACTIVE', () => {
        const action = { type: SET_IS_GRID_VIEW_ACTIVE, payload: false };
        const expectedState = { ...initialState, isGridViewActive: false };
        expect(BookReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle SET_TOTAL_RECORDS', () => {
        const action = { type: SET_TOTAL_RECORDS, payload: 10 };
        const expectedState = { ...initialState, totalRecords: 10 };
        expect(BookReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle SET_SELECTED_PAGE', () => {
        const action = { type: SET_SELECTED_PAGE, payload: 2 };
        const expectedState = { ...initialState, selectedPage: 2 };
        expect(BookReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle SET_SEARCH_QUERY', () => {
        const action = { type: SET_SEARCH_QUERY, payload: 'search text' };
        const expectedState = { ...initialState, searchQuery: 'search text' };
        expect(BookReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle SET_BOOKS_DATA', () => {
        const action = { type: SET_BOOKS_DATA, payload: [{ id: 1, title: 'Book 1' }] };
        const expectedState = { ...initialState, booksData: [{ id: 1, title: 'Book 1' }] };
        expect(BookReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle SET_SELECTED_BOOK', () => {
        const book = { id: 1, title: 'Selected Book' };
        const action = { type: SET_SELECTED_BOOK, payload: book };
        const expectedState = { ...initialState, selectedBook: book, isGridViewActive: false };
        expect(BookReducer(initialState, action)).toEqual(expectedState);
    });
});

