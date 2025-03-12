
const Borrow = require('../models/borrowModel');


const borrowBooks = async (req, res) => {
    try {
        const { userId, bookIds } = req.body;
        if (!userId || !Array.isArray(bookIds) || bookIds.length === 0) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const borrowEntry = new Borrow({ userId, bookIds });
        await borrowEntry.save();
        res.status(201).json({ message: 'Books borrowed successfully', borrowEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error borrowing books', error });
    }
};

const returnBooks = async (req, res) => {
    try {
        const { userId, bookIds } = req.body;
        const deletedEntry = await Borrow.findOneAndDelete({ userId, bookIds });
        if (!deletedEntry) return res.status(404).json({ message: 'No matching borrow entry found' });
        res.status(200).json({ message: 'Books returned successfully', deletedEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error returning books', error });
    }
};


const getBorrowedBooks = async (req, res) => {
    try {
        const { userId } = req.params;
        const entries = await Borrow.find({ userId }).populate('bookIds');
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching borrowed books', error });
    }
};

module.exports = { borrowBooks, returnBooks, getBorrowedBooks };
