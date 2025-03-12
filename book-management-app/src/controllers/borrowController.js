const Borrow = require('../models/borrowModel');
const Book = require('../models/bookModel');


const borrowBooks = async (req, res) => {
    try {
        const { userId, bookIds } = req.body;

        if (!userId || !Array.isArray(bookIds) || bookIds.length === 0) {
            return res.status(400).json({ message: 'Invalid input data. userId and bookIds are required.' });
        }

        
        const books = await Book.find({ _id: { $in: bookIds } });
        if (books.length !== bookIds.length) {
            return res.status(404).json({ message: 'One or more books not found' });
        }

        const borrowEntry = new Borrow({ userId, bookIds });
        await borrowEntry.save();

        res.status(201).json({ message: 'Books borrowed successfully', borrowEntry });
    } catch (error) {
        console.error("Error borrowing books:", error);
        res.status(500).json({ message: 'Error borrowing books', error });
    }
};


const returnBooks = async (req, res) => {
    try {
        const { userId, bookIds } = req.body;

        if (!userId || !Array.isArray(bookIds) || bookIds.length === 0) {
            return res.status(400).json({ message: 'Invalid input data. userId and bookIds are required.' });
        }

        const deletedEntry = await Borrow.findOneAndDelete({ userId, bookIds });

        if (!deletedEntry) {
            return res.status(404).json({ message: 'No matching borrow entry found or books were not borrowed by this user.' });
        }

        res.status(200).json({ message: 'Books returned successfully', deletedEntry });
    } catch (error) {
        console.error("Error returning books:", error);
        res.status(500).json({ message: 'Error returning books', error });
    }
};


const getBorrowedBooks = async (req, res) => {
    try {
        const { userId } = req.params;

       
        const borrowedBooks = await Borrow.find({ userId }).populate('bookIds', 'title author genre publishedYear');

        if (!borrowedBooks || borrowedBooks.length === 0) {
            return res.status(404).json({ message: "No borrowed books found for this user" });
        }

        res.status(200).json(borrowedBooks);
    } catch (error) {
        console.error("Error fetching borrowed books:", error);
        res.status(500).json({ message: 'Error fetching borrowed books', error });
    }
};

module.exports = { borrowBooks, returnBooks, getBorrowedBooks };
