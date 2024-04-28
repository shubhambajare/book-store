import { Book } from "../../model/Book";

export const SET_IS_GRID_VIEW_ACTIVE = 'set is grid view active';
export const SET_TOTAL_RECORDS = 'set total records';
export const SET_SELECTED_PAGE = 'set selected page';
export const SET_SEARCH_QUERY = 'set search query';
export const SET_BOOKS_DATA = 'set books data';
export const GET_BOOKS_DATA = 'get books data';
export const SET_SELECTED_BOOK = 'set selected book';

export const setIsGridViewActive = (value: boolean) => ({ payload: value, type: SET_IS_GRID_VIEW_ACTIVE })
export const setTotalRecords = (value: number) => ({ payload: value, type: SET_TOTAL_RECORDS })
export const setSelectedPage = (value: number) => ({ payload: value, type: SET_SELECTED_PAGE })
export const setSearchQuery = (value: string) => ({ payload: value, type: SET_SEARCH_QUERY })
export const setBooksData = (value: Book[]) => ({ payload: value, type: SET_BOOKS_DATA })
export const getBooksData = () => ({ payload: null, type: GET_BOOKS_DATA })
export const setSelectedBook = (value: Book) => ({ payload: value, type: SET_SELECTED_BOOK })
