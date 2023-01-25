import express from "express";
import { Book } from "./book.mjs";


export const books = [
    {
        id: 1,
        title: 'UML Distilled',
        author: 'rashad mhmd',
        language: 'ar',
        isbn: '1023456789',
        pages_no: 60
    },
    {
        id: 2,
        title: 'Software Engineering',
        author: 'ahmed anything',
        language: 'en',
        isbn: '1203456789',
        pages_no: 90
    },
    {
        id: 3,
        title: 'Software handling',
        author: 'sasha stalon',
        language: 'en',
        isbn: '1230456789',
        pages_no: 80
    },
    {
        id: 4,
        title: 'fvuihpfu9vhpu',
        author: 'sasha stalon',
        language: 'ar',
        isbn: '1234056789',
        pages_no: 50
    },
    {
        id: 5,
        title: 'fvuihpbbfu9vhpu',
        author: 'sasha stalon',
        language: 'ar',
        isbn: '1234006789',
        pages_no: 50
    },
    {
        id: 6,
        title: 'Software Engineering',
        author: 'ahmed anything',
        language: 'en',
        isbn: '1203450789',
        pages_no: 90
    }


];

export const booksRouter = express.Router();
// booksRouter.get('/', (req, res) => {
//     res.json(books);
// });

booksRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const book = books.find(b => b.id == id);
    console.log(book);
    if (!book) {
        res.status(404).json({
            message: 'book not found'
        });
        return;

    }
    res.json(book);
});

booksRouter.get('/', paginatedResults(books), (req, res) => {
    res.json(res.paginatedResults);
});

function paginatedResults(model) {
    // middleware function
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        // calculating the starting and ending index
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};
        if (endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        results.results = model.slice(startIndex, endIndex);

        res.paginatedResults = results;
        next();
    };
}

booksRouter.post('/', (req, res) => {
    if (req.body["pages_no"] < 50) {
        res.status(404).json({
            message: "book pages not greater than 50 "
        });
        return;
    }
    if (req.body["isbn"][0] == 0 || req.body["isbn"].length != 10) {
        res.status(404).json({
            message: "isbn rejected "
        });
        return;
    }
    console.log(req.body);
    books.push(req.body);
    res.status(201).json();


});

booksRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            books[i] = req.body;
            res.status(200).json();
            return;
        }
    }
    res.status(404).json({
        message: "book not found"
    });
});
booksRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    // search inside books array for book id then delete the book
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            books.splice(i, 1);
            res.status(200).json({
                message: 'Book deleted successfully',
            });
            return;
        }
    }
    res.status(404).json({
        message: 'The book with the given id was not found'
    });
});




