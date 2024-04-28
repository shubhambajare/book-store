import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import SearchBar from '../../components/SearchBar';

const mockStore = configureStore([]);

describe('SearchBar', () => {
    let store: MockStoreEnhanced<unknown, {}>;

    beforeEach(() => {
        store = mockStore({
            isGridViewActive: true,
        });
    });

    it('renders SearchBar component with correct title', () => {
        const { getByText } = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );

        expect(getByText('Book Store')).toBeInTheDocument();
    });

    it('renders SearchBar component with search input', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );

        expect(getByPlaceholderText('Search…')).toBeInTheDocument();
    });

    it('does not dispatch setSearchQuery action when Enter key is pressed in the search input and input value is empty', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );

        const searchInput = getByPlaceholderText('Search…');
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
    });

    it('updates searchQuery state correctly when input value changes', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );

        const searchInput = getByPlaceholderText('Search…');
        fireEvent.change(searchInput, { target: { value: 'new value' } });

        expect(searchInput).toHaveValue('new value');
    });

    it('does not dispatch setSearchQuery action when search input loses focus and input value is empty', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );

        const searchInput = getByPlaceholderText('Search…');
        fireEvent.blur(searchInput);

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
    });

    it('updates searchQuery state correctly when search input value is cleared', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );

        const searchInput = getByPlaceholderText('Search…');
        fireEvent.change(searchInput, { target: { value: 'test query' } });
        fireEvent.change(searchInput, { target: { value: '' } });

        expect(searchInput).toHaveValue('');
    });

    it('does not dispatch setSearchQuery action when search input value is cleared', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );

        const searchInput = getByPlaceholderText('Search…');
        fireEvent.change(searchInput, { target: { value: 'test query' } });
        fireEvent.change(searchInput, { target: { value: '' } });
        fireEvent.blur(searchInput);

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
    });
});
