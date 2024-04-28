import * as redux from 'redux';
import { BookReducer } from "./reducers/BookReducer";

export const store = redux.createStore(BookReducer);