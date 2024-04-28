import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'

import { Book } from '../model/Book'
import { setSelectedBook } from '../store/actions/BookActions';

export default function BookCard(props: { book: Book }) {

    const dispatch = useDispatch();

    const handleBookClick = (book: Book) => {
        dispatch(setSelectedBook(book))
        scrollToTop()
    }
    const scrollToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card onClick={() => handleBookClick(props.book)}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={props.book.volumeInfo.imageLinks?.thumbnail || require('/src/assets/book.png')}
                    title={props.book.volumeInfo.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.book.volumeInfo.title.length > 40 ? props.book.volumeInfo.title.slice(0, 40) + '...' : props.book.volumeInfo.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" marginTop={1}>
                        Author(s):
                        <br />
                        {props.book.volumeInfo.authors?.map(author =>
                            <Typography key={author} variant="overline" color="text.primary">
                                {author}
                            </Typography>
                        )}

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => handleBookClick(props.book)}>Show Details</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
