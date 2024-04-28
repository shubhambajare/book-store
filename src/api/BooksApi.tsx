import { Book } from "../model/Book";

const GET_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const MAX_RESULTS = 8;

export const getBooks = (searchQuery: string, page = 0): Promise<{ totalItems: number, items: Array<Book> }> => {
    return new Promise(async (resolve, reject) => {
        if (searchQuery.trim().length == 0) {
            resolve({ totalItems: 0, items: [] })
            return
        }
        searchQuery = searchQuery.replaceAll(' ', '+')
        fetch(GET_BOOKS_API_URL + searchQuery + "&startIndex=" + (page * MAX_RESULTS) + "&maxResults=" + MAX_RESULTS)
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}