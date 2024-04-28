export class Book {
    id: string;
    volumeInfo: {
        title: string,
        authors: string[],
        publisher: string,
        publishedDate: string,
        description: string,
        categories: string[],
        averageRating: number,
        ratingsCount: number,
        imageLinks: { thumbnail: string };
        infoLink: string;
        industryIdentifiers: Array<{ type: string, identifier: string }>
    };

    constructor(rawBook: {
        id: string,
        volumeInfo: {
            title: string,
            authors: string[],
            publisher: string,
            publishedDate: string,
            description: string,
            categories: string[],
            averageRating: number,
            ratingsCount: number,
            imageLinks: { thumbnail: string },
            infoLink: string,
            industryIdentifiers: Array<{ type: string, identifier: string }>
        },
    }) {

        this.id = rawBook.id;
        this.volumeInfo = rawBook.volumeInfo;
    }

}