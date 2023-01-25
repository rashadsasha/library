import express from "express";
import {booksRouter} from "./books-api.mjs";
import {authorsRouter} from "./authors-api.mjs";
import {borrowersRouter} from "./borrowers-api.mjs";

export const apiRouter = express.Router();
apiRouter.use(express.json());

 apiRouter.use((req,res,next) =>{
     console.log(`new request: ${req.url}`);
    next();
 });

 apiRouter.use('/books', booksRouter);
 apiRouter.use('/authors', authorsRouter);
 apiRouter.use('/borrowers', borrowersRouter);