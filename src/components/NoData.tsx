import { Typography } from '@mui/material'

function NoData() {
    return (
        <div className='bs-no-data-container'>
            <img src={require('/src/assets/noData.png')} width={"50%"} />
            <Typography variant="body2" color="text.primary">
                Nothing to show.
                <br />
                Type in search bar and hit Enter to get books.
            </Typography>
        </div>
    )
}

export default NoData