import express from "express";
import { books } from "./books-api.mjs";
import { Borrower } from "./borrower.mjs"

const borrowers = [
    {
        id: 1,
        first_name: 'samah',
        last_name: 'batata',
        books_borrowed: []
    },
    {
        id: 2,
        first_name: 'mahmuod',
        last_name: 'darweesh',
        books_borrowed: [1, 2]
    },
    {
        id: 3,
        first_name: 'hani',
        last_name: 'shaker',
        books_borrowed: [3]
    }
]

export const borrowersRouter = express.Router();

borrowersRouter.get('/', (req, res) => {
    res.json(borrowers);
});

borrowersRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const borrower = borrowers.find(b => b.id == id);
    console.log(borrower);
    if (!borrower) {
        res.status(404).json({
            message: 'borrower not listed'
        });
        return;

    }
    res.json(borrower);
});

borrowersRouter.post('/', (req, res) => {
    console.log(req.body);
    borrowers.push(req.body);
    res.status(201).json();
});

borrowersRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    for (let i = 0; i < borrowers.length; i++) {
        if (borrowers[i].id == id) {
            borrowers[i] = req.body;
            res.status(200).json();
            return;
        }
    }
    res.status(404).json({
        message: "borrower not not listed"
    });
});

borrowersRouter.delete('/:id', (req, res) => {
    const id = req.params.id;

    for (let i = 0; i < borrowers.length; i++) {
        if (borrowers[i].id == id) {
            borrowers.splice(i, 1);
            res.status(200).json({
                message: 'borrower deleted successfully',
            });
            return;
        }
    }
    res.status(404).json({
        message: 'borrower not listed'
    });
});

borrowersRouter.get('/:id/books', (req, res) => {
    let borrower_books = [];
    const id = req.params.id;
    const borrower = borrowers.find(b => b.id == id);
    if (!borrower) {
        res.status(404).json({
            message: 'borrower not listed'
        });
        return;

    }

    borrower.books_borrowed.forEach(book_id => {
        let book = books.find(b => b.id == book_id);
        borrower_books.push(book);
    });



    console.log(borrower_books);

    res.json(borrower_books);
});