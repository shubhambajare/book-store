import { useDispatch, useSelector } from "react-redux";
import { Grid, Pagination } from "@mui/material";

import BookCard from "./BookCard";
import BookDetails from "./BookDetails";

import { setSelectedPage } from "../store/actions/BookActions";
import { InitialState } from "../store/reducers/BookReducer";

export default function BookResult() {

    const isGridActive = useSelector((state: InitialState) => state.isGridViewActive);
    const totalRecords = useSelector((state: InitialState) => state.totalRecords);
    const selectedPage = useSelector((state: InitialState) => state.selectedPage);
    const booksData = useSelector((state: InitialState) => state.booksData);

    const dispatch = useDispatch();

    const pageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setSelectedPage(page - 1))
    }
    return (
        <>
            {
                isGridActive && totalRecords != 0 ?
                    <>
                        <div style={{ marginTop: 20, textAlign: "center" }}>
                            <Pagination
                                color="primary"
                                count={Math.floor(totalRecords / 8) - 1}
                                onChange={pageChange}
                                page={selectedPage + 1} />
                        </div>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={1}>
                            {booksData?.map(book =>
                                <BookCard key={book.id} book={book} />
                            )}
                        </Grid>
                    </>
                    : <BookDetails />
            }
        </>
    )
}
