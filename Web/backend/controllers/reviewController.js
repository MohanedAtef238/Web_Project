const Review = require('../models/review');
const Book = require('../models/book');

  const addReview = async (req, res) => {
    try {
      const { user, book, message } = req.body;
      console.log('Creating review with user:', user, ', book:', book, ', and message:', message);
  
      if (!user || !book || !message) {
        console.log('Missing fields:', { user, book, message });
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const review = new Review({ userId: user.id, bookId: book.id, content: message});
  
      await review.save();
      console.log('Review created <3');
  
      res.status(201).json(review);
    } catch (error) {
      console.error("Error in addReview :( :", error);
      res.status(500).json({ error: error.message });
    }
  };

  const getReviewsForBook = async (req, res) => {
    try {
      const { bookID } = req.body;
  
      if (!bookID) {
        return res.status(400).json({ error: 'Book ID is required' });
      }
  
      const reviews = await Review.find(bookID).populate('userId', 'username');
  
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ error: 'No reviews for this book' });
      }
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error in getReviewsForBook:', error);
      res.status(500).json({ error: error.message });
    }
  };



module.exports = { addReview, getReviewsForBook };

