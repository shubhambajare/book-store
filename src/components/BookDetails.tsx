import { memo } from "react"
import { Button, CardMedia, Grid, Rating, Typography } from "@mui/material"
import { useSelector } from "react-redux";

import { InitialState } from "../store/reducers/BookReducer";

function BookDetails() {

    const book = useSelector((state: InitialState) => state.selectedBook)!;

    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={1}>
                <Grid item xs={12} sm={4}>
                    <CardMedia
                        component="img"
                        width={"100%"}
                        image={book.volumeInfo.imageLinks?.thumbnail || require('/src/assets/book.png')}
                        alt={book.volumeInfo.title}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom variant="h5" component="div">
                        {book.volumeInfo.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" marginTop={1}>
                        Author(s):
                        <Typography variant="overline" color="text.primary" marginLeft={1}>
                            {book.volumeInfo.authors?.map(author => author + " ")}
                        </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign={"justify"} marginTop={1}>
                        Rating:
                        <br />
                        <Rating name="read-only" value={book.volumeInfo.averageRating} readOnly />
                    </Typography>



                    <Typography variant="body2" color="text.secondary" textAlign={"justify"} marginTop={1}>
                        Categories:
                        {book.volumeInfo.categories?.map(category =>

                            <Button size="small" variant="contained" key={category} style={{ borderRadius: 20, marginLeft: 10, padding: "1px 10px" }}> {category}</Button>
                        )}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" textAlign={"justify"} marginTop={1}>
                        Publisher:
                        <Typography variant="overline" color="text.primary" marginLeft={1}>
                            {book.volumeInfo.publisher}
                        </Typography>
                    </Typography>

                    <Typography variant="body2" color="text.secondary" textAlign={"justify"}>
                        Published Date:
                        <Typography variant="overline" color="text.primary" marginLeft={1}>
                            {book.volumeInfo.publishedDate}
                        </Typography>
                    </Typography>

                    <Typography variant="body2" color="text.secondary" textAlign={"justify"} marginTop={1}>
                        ISBN Details:
                        <br />
                        {book.volumeInfo.industryIdentifiers?.map(isbn =>
                            <Typography key={isbn.identifier} variant="overline" color="text.primary" marginLeft={1}>
                                Type: {isbn.type} Identifier: {isbn.identifier} <br />
                            </Typography>
                        )}
                    </Typography>


                    <Button size="small" variant="outlined" target="_blank" href={book.volumeInfo.infoLink} style={{ borderRadius: 20, marginTop: 10 }} >More Details</Button>

                </Grid>
            </Grid >
            <Typography gutterBottom variant="h6" component="div" marginTop={1}>
                Description:
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign={"justify"}>
                {book.volumeInfo.description || "Not Available"}
            </Typography>
        </>
    )
}

export default memo(BookDetails)