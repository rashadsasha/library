import express from "express";
import { Author } from "./author.mjs";
import { books } from "./books-api.mjs";
const authors = [
    {
        id: 1,
        first_name: 'rashad',
        last_name: 'mhmd'
    },
    {
        id: 2,
        first_name: 'ahmed',
        last_name: 'anything'
    },
    {
        id: 3,
        first_name: 'sasha',
        last_name: 'stalon'
    }
]

export const authorsRouter = express.Router();


authorsRouter.get('/', (req, res) => {
    res.json(authors);
});

authorsRouter.post('/', (req, res) => {
    console.log(req.body);
    authors.push(req.body);
    res.status(201).json();
});

authorsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const author = authors.find(b => b.id == id);
    console.log(author);
    if (!author) {
        res.status(404).json({
            message: 'author not listed'
        });
        return;

    }
    res.json(author);
});

authorsRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    for (let i = 0; i < authors.length; i++) {
        if (authors[i].id == id) {
            authors[i] = req.body;
            res.status(200).json();
            return;
        }
    }
    res.status(404).json({
        message: "author not not listed"
    });
});


authorsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    let authorname = '';
    let isfound = false;
    for (let i = 0; i < authors.length; i++) {
        if (authors[i].id == id) {
            authorname = authors[i].first_name + ' ' + authors[i].last_name;
            for (let j = 0; j < books.length; j++) {
                if (books[j].author == authorname) {
                    isfound = true;
                    break;
                }
            }
            break;
        }
    }

    if (isfound) {
        res.status(400).json({
            message: 'delete rejected'
        });

    } else {
        authors.splice(i, 1);
        res.status(200).json({
            message: ' deleted successfully',
        });

    }


});

authorsRouter.get('/:id/books', (req, res) => {
    let author_books = [];
    const id = req.params.id;
    const author = authors.find(b => b.id == id);
    if (!author) {
        res.status(404).json({
            message: 'author not listed'
        });
        return;

    }
    let authorname = author.first_name + ' ' + author.last_name;
    for (let i = 0; i < books.length; i++) {
        if (books[i].author == authorname) {
            author_books.push(books[i]);
        }
    }


    
    console.log(author_books);
    
    res.json(author_books);
});