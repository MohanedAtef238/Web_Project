const { Book, User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const categories = [
  'fantasy', 'science_fiction', 'biographies', 'recipes', 
  'romance', 'textbooks', 'children', 'history', 'religion', 
  'mystery_and_detective_stories', 'plays', 'science'
];

const sampleBooks = [
  {
    title: "The Last Dragon Rider",
    genre: "fantasy",
    description: "A thrilling fantasy tale about the last dragon rider's quest to save their world.",
  },
  {
    title: "Beyond the Stars",
    genre: "science_fiction",
    description: "An epic space adventure that explores the boundaries of human potential.",
  },
  {
    title: "The Innovator's Journey",
    genre: "biographies",
    description: "The life story of a remarkable inventor who changed the world.",
  },
  {
    title: "Flavors of Home",
    genre: "recipes",
    description: "A collection of heartwarming family recipes passed down through generations.",
  },
  {
    title: "Love in Paris",
    genre: "romance",
    description: "A passionate love story set in the romantic streets of Paris.",
  },
  {
    title: "Advanced Mathematics",
    genre: "textbooks",
    description: "A comprehensive guide to advanced mathematical concepts.",
  },
  {
    title: "The Magic Garden",
    genre: "children",
    description: "A delightful story about a magical garden and its tiny inhabitants.",
  },
  {
    title: "Ancient Civilizations",
    genre: "history",
    description: "An exploration of the world's most fascinating ancient civilizations.",
  },
  {
    title: "Spiritual Wisdom",
    genre: "religion",
    description: "A thoughtful examination of spiritual teachings across cultures.",
  },
  {
    title: "The Silent Witness",
    genre: "mystery_and_detective_stories",
    description: "A gripping detective story with unexpected twists.",
  },
  {
    title: "The Stage of Life",
    genre: "plays",
    description: "A powerful dramatic play about family, love, and redemption.",
  },
  {
    title: "The Quantum World",
    genre: "science",
    description: "An accessible guide to the fascinating world of quantum physics.",
  }
];

async function seedBooks() {
  try {
    // First, create an admin user if it doesn't exist
    let adminUser = await User.findOne({ where: { username: 'admin' } });
    
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin1!', 10);
      adminUser = await User.create({
        id: uuidv4(),
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        isAuthor: true
      });
    }

    // Create one book for each genre
    for (const bookData of sampleBooks) {
      const existingBook = await Book.findOne({ 
        where: { 
          title: bookData.title,
          genre: bookData.genre 
        } 
      });

      if (!existingBook) {
        await Book.create({
          id: uuidv4(),
          title: bookData.title,
          description: bookData.description,
          genre: bookData.genre,
          authorId: adminUser.id,
          coverImage: `/app/uploads/covers/default-${bookData.genre}.jpg`,
          audioFile: `/app/uploads/audio/default-${bookData.genre}.mp3`,
          createdAt: new Date()
        });
        console.log(`Created book: ${bookData.title}`);
      }
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding books:', error);
  }
}

module.exports = seedBooks; 