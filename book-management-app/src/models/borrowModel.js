
const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
    borrowedAt: { type: Date, default: Date.now }
});

const Borrow = mongoose.model('Borrow', borrowSchema);
module.exports = Borrow;
