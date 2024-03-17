import express from 'express';
import '../db/db.js';
import Book from './Book.js';

const app = express();
const PORT = 3000

app.use(express.json());
app.post('/book', async (req, res) => {
    try {
        const newBook = await Book.create({ ...req.body });
        await newBook.save();
        res.status(200).json('New book added successfully');
    }
    catch (_err) {
        res.status(500).json({ 'Message': 'Internal server error!' })
    }
});

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        if (!books) {
            return res.status(404).json('No books yet :(');
        }
        return res.status(200).json(books);
    }
    catch (_err) {
        res.status(500).json({ 'Message': 'Internal server error!' })
    }
});

app.get('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (book) return res.status(200).json(book);
        else return res.status(404).json(`No match for book with id ${id}`);
    }
    catch (_err) {
        return res.status(500).json('Internal server error!')
    }
});

app.delete('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        if (book) return res.status(200).json('Book has been successfuflly deleted!');
        else return res.status(404).json(`Book with id ${id} not found!`);
    }
    catch (_err) {
        return res.status(500).json('Internal server error!')
    }
});

app.listen(PORT, () => console.log(`Server is listening to requests on port ${PORT}`))