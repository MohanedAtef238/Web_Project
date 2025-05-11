const UserInteraction = require('../models/userInteractions');
const Review = require('../models/review');

// Add user interaction (like, view, play, etc.)
const addUserInteraction = async (req, res) => {
    console.log("controller: adding a user interaction with body: ", req.body)
    try {
        const { userID, bookID, action } = req.body;
        const interaction = await UserInteraction.create({
            userId: userID,
            bookId: bookID,
            actionType: action,
        });
        console.log("added interaction or nah?")
        res.status(200).json(interaction);
    } catch (error) {
        console.log("recommendations controller has error")
        res.status(500).json({ error: error.message });
    }
};

// Calculate points based on action type
const calculatePoints = (interaction) => {
  let points = 0;
  
  switch (interaction.actionType) {
    case 'liked':
      points = 4;
      break;
    case 'viewed':
      points = 1;
      break;
    case 'played':
      points = 2;
      break;
    default:
      points = 0;
      break;
  }

  return points;
};

// Get user preferences based on reviews and interactions
const getUserPreferences = async (userId) => {
  const genrePoints = {};
  const authorPoints = {};

  try {
    // Step 1: Fetch reviews for the user
    const reviews = await Review.find({ userId });

    reviews.forEach((review) => {
      const genre = review.genre;
      const author = review.author;
      const rating = review.rating;

      // Calculate points from rating
      if (rating === 5) {
        genrePoints[genre] = (genrePoints[genre] || 0) + 4;
        authorPoints[author] = (authorPoints[author] || 0) + 4;
      } else if (rating === 4) {
        genrePoints[genre] = (genrePoints[genre] || 0) + 3;
        authorPoints[author] = (authorPoints[author] || 0) + 3;
      }
    });

    // Step 2: Calculate points based on user interactions
    const interactions = await UserInteraction.findAll({ where: { userId } });

    interactions.forEach((interaction) => {
      const genre = interaction.genre; // Directly use the genre from interaction
      const author = interaction.author; // Directly use the author from interaction
      const points = calculatePoints(interaction);

      // Add points to the genre and author
      genrePoints[genre] = (genrePoints[genre] || 0) + points;
      authorPoints[author] = (authorPoints[author] || 0) + points;
    });

    // Step 3: Get the genre and author with the highest points
    const bestGenre = Object.entries(genrePoints).reduce((max, [genre, points]) => 
      (points > max.points ? { genre, points } : max), { genre: '', points: 0 });

    const bestAuthor = Object.entries(authorPoints).reduce((max, [author, points]) => 
      (points > max.points ? { author, points } : max), { author: '', points: 0 });

    return { bestGenre: bestGenre.genre, bestAuthor: bestAuthor.author };
  } catch (error) {
    console.error('Error calculating preferences:', error.message);
    throw new Error('Failed to calculate preferences');
  }
};

// Return best genre and author recommendations
const getUserRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    // Step 1: Get the best genre and author
    const { bestGenre, bestAuthor } = await getUserPreferences(userId);

    // Step 2: Return the best genre and author
    return res.status(200).json({ bestGenre, bestAuthor });

  } catch (error) {
    console.error('Error fetching recommendations:', error.message);
    return res.status(500).json({ error: 'Failed to get recommendations' });
  }
};

// Export functions
module.exports = { getUserRecommendations, addUserInteraction };
