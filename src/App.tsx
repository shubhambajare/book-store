import { useEffect, useState } from 'react'
import './App.css'
import { getBooks } from './api/BooksApi'
import BookResult from './components/BookResult'
import SearchBar from './components/SearchBar'
import { CircularProgress, Snackbar } from '@mui/material'
import NoData from './components/NoData'
import { useDispatch, useSelector } from 'react-redux'
import { setBooksData, setIsGridViewActive, setSelectedPage, setTotalRecords } from './store/actions/BookActions'
import { InitialState } from './store/reducers/BookReducer'

function App() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const totalRecords = useSelector((state: InitialState) => state.totalRecords);
    const selectedPage = useSelector((state: InitialState) => state.selectedPage);
    const searchQuery = useSelector((state: InitialState) => state.searchQuery);

    const dispatch = useDispatch();

    useEffect(() => {
        getBooksData();
    }, [selectedPage])

    useEffect(() => {
        dispatch(setSelectedPage(0))
        getBooksData();
    }, [searchQuery])

    const getBooksData = async () => {
        setIsLoading(true);
        const result = await getBooks(searchQuery, selectedPage).catch(e => {
            console.error("Error: ", e);
            setMessage(e.message)
            return { totalItems: 0, items: [] }
        })
        dispatch(setBooksData(result.items))
        dispatch(setIsGridViewActive(true))
        dispatch(setTotalRecords(result.totalItems))
        setIsLoading(false)
    }

    return (
        <>
            <SearchBar />
            {
                isLoading ?
                    <div className='bs-progressbar-container'>
                        <CircularProgress
                        />
                    </div>
                    : totalRecords > 0 ?
                        <BookResult />
                        : <NoData />
            }
            <Snackbar
                open={!!message.length}
                autoHideDuration={6000}
                onClose={() => { setMessage('') }}
                message={message}
            />
        </>

    )
}

export default App
