const Review = require('../models/review');
const Book = require('../models/book');

  const addReview = async (req, res) => {
      console.log('reached add review controller with req body: ', req.body);
    try {
      const { user, book, message } = req.body;
      console.log('Creating review with user:', user, ', book:', book, ', and message:', message);
      console.log('Or look at this:', req.body.user, ', book:', req.body.book, ', and message:', req.body.message);
  
      if (!user || !book || !message) {
        console.log('Missing fields:', { user, book, message });
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // const review = new Review({ userId: req.body.user, bookId: req.body.book, content: req.body.message});
      const review = new Review({ username: user, bookId: book, content: message});
  
      await review.save();
      console.log('Review created <3');
  
      res.status(201).json(review);
    } catch (error) {
      console.error("Error in addReview :( :", error);
      res.status(500).json({ error: error.message });
    }
  };

  const getReviewsForBook = async (req, res) => {
    console.log('reviews controller: received comments request. Fteching comments now for bookid: ', req.body,'\nSpecifically ', req.body.bookId)
    try {
      const { bookID } = req.body.bookId;
      //console.log('controller: searching for book id: ', bookID, ' and look at req body: ', req.body)
  
      if (!req.body.bookId) {   //here too is changed
        console.log('error 400 says no id dayum');
        return res.status(400).json({ error: 'Book ID is required' });
      }
  
      // const reviews = await Review.find(req.body).populate('username', 'content', 'createdAt');  //i have no idea why bookID is not working
      // const reviews = await Review.find(bookID).populate('username', 'content', 'createdAt');
      const reviews = await Review.find(bookID);

      if( reviews.length === 0)
      {
        console.log('no reviews yay')
        //return res.status(401).json({ error: 'No reviews for this book yet ;)'});
      }
      else if (!reviews) {
        console.log('some error occured whike fetching asad')
        return res.status(404).json({ error: 'No reviews for this book' });
      }

      console.log('succes')
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Controller: error in getReviewsForBook:', error);
      res.status(500).json({ error: error.message });
    }
  };



module.exports = { addReview, getReviewsForBook };

