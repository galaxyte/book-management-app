
   const express = require('express');
   const {
       borrowBooks,
       returnBooks,
       getBorrowedBooks,
   } = require('../controllers/borrowController'); 

   const router = express.Router();


   router.post('/borrow', borrowBooks); 
   router.post('/return', returnBooks); 
   router.get('/borrowed/:userId', getBorrowedBooks); 

   module.exports = router;