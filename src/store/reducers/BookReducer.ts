import { Book } from "../../model/Book";
import { SET_BOOKS_DATA, SET_IS_GRID_VIEW_ACTIVE, SET_SEARCH_QUERY, SET_SELECTED_BOOK, SET_SELECTED_PAGE, SET_TOTAL_RECORDS } from "../actions/BookActions";

export type InitialState = {
    isGridViewActive: boolean,
    totalRecords: number,
    selectedPage: number,
    searchQuery: string,
    selectedBook: Book | null,
    booksData: Book[]
}

const initialState: InitialState = {
    isGridViewActive: true,
    totalRecords: 0,
    selectedPage: 0,
    searchQuery: '',
    selectedBook: null,
    booksData: []
}


export const BookReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case SET_IS_GRID_VIEW_ACTIVE: {
            return {
                ...state,
                isGridViewActive: action.payload
            };
        }
        case SET_TOTAL_RECORDS: {
            return {
                ...state,
                totalRecords: action.payload
            };
        }
        case SET_SELECTED_PAGE: {
            return {
                ...state,
                selectedPage: action.payload
            };
        }
        case SET_SEARCH_QUERY: {
            return {
                ...state,
                searchQuery: action.payload
            };
        }
        case SET_BOOKS_DATA: {
            return {
                ...state,
                booksData: action.payload,
                isGridViewActive: true
            };
        }
        case SET_SELECTED_BOOK: {
            return {
                ...state,
                selectedBook: action.payload,
                isGridViewActive: false
            };
        }
        default: return state;
    }
}