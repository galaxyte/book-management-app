
const Book = require('../models/bookModel');


const addBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear } = req.body;
        const newBook = new Book({ title, author, genre, publishedYear });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error });
    }
};


const viewAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};


const searchBooks = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const foundBooks = await Book.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { author: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        res.status(200).json(foundBooks);
    } catch (error) {
        res.status(500).json({ message: 'Error searching books', error });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};

module.exports = { addBook, viewAllBooks, searchBooks, updateBook, deleteBook };
