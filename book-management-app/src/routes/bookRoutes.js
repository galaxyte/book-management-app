
const express = require('express');
const {
    addBook,
    viewAllBooks,
    searchBooks,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');

const router = express.Router();


router.post('/books', addBook); 
router.get('/books', viewAllBooks); 
router.get('/books/search', searchBooks); 
router.put('/books/:id', updateBook); 
router.delete('/books/:id', deleteBook); 

module.exports = router;