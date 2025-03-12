
   const express = require('express');
   const {
       borrowBooks,
       returnBooks,
       getBorrowedBooks,
   } = require('../controllers/borrowController'); 

   const router = express.Router();


   router.post('/borrow', borrowBooks); 
   router.post('/return', returnBooks); 
   router.get('/user/:userId', getBorrowedBooks); 

   module.exports = router;