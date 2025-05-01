const { Favorite, User, Book } = require('../models');

const getUserFavorites = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const favorites = await Favorite.findAll({
            where: { userId: user.id },
            include: [{
                model: Book,
                attributes: ['id', 'title', 'coverUrl', 'author']
            }]
        });

        res.json(favorites.map(f => f.Book));
    } catch (error) {
        console.error('Error in getUserFavorites:', error);
        res.status(500).json({ error: error.message });
    }
};

const addToFavorites = async (req, res) => {
    try {
        const { username } = req.params;
        const { bookId } = req.body;
        
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await Favorite.create({
            userId: user.id,
            bookId: book.id
        });

        res.status(201).json({ message: 'Book added to favorites' });
    } catch (error) {
        console.error('Error in addToFavorites:', error);
        res.status(500).json({ error: error.message });
    }
};

const removeFromFavorites = async (req, res) => {
    try {
        const { username, bookId } = req.params;
        
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await Favorite.destroy({
            where: {
                userId: user.id,
                bookId: bookId
            }
        });

        res.status(200).json({ message: 'Book removed from favorites' });
    } catch (error) {
        console.error('Error in removeFromFavorites:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {getUserFavorites,addToFavorites,removeFromFavorites}; 