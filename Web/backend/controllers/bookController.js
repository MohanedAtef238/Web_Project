const { Book, User } = require('../models');

const getUserBooks = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const books = await Book.findAll({
            where: { authorId: user.id },
            attributes: ['id', 'title', 'duration', 'isPublished']
        });

        res.json(books);
    } catch (error) {
        console.error('Error in getUserBooks:', error);
        res.status(500).json({ error: error.message });
    }
};

const getBookDetails = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        console.error('Error in getBookDetails:', error);
        res.status(500).json({ error: error.message });
    }
};

const addBook = async (req, res) => {
    try {
        const { username } = req.params;
        const { title, genre, audioFile, coverImage, duration, description, isPublished } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const book = await Book.create({
            title,
            genre,
            audioFile,
            coverImage,
            duration,
            description,
            isPublished: isPublished || false,
            authorId: user.id
        });

        res.status(201).json(book);
    } catch (error) {
        console.error('Error in addBook:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {getUserBooks,getBookDetails,addBook}; 