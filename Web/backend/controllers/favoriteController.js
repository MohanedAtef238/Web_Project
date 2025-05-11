const { Favorite, User, Book } = require('../models');

const getUserFavorites = async (req, res) => {
    try {
        const { username } = req.params;
<<<<<<< HEAD
        const user = await User.findOne({ 
            where: { username: username },
            attributes: ['id']
        });
        console.log('user', user);
=======
        const user = await User.findOne({ where: { username } });
        
>>>>>>> parent of be6c1ec (Merge branch 'main' of https://github.com/MohanedAtef238/Web_Project)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const favorites = await Favorite.findAll({
            where: { userId: user.id },
            include: [{
                model: Book,
                as: 'book',
                attributes: ['id']
            }]
        });

        const bookIds = favorites.map(f => f.book.id);
        const books = await Book.findAll({
            where: { id: bookIds },
            attributes: ['id', 'title', 'coverImage', 'authorId'],
            include: [{
                model: User,
                as: 'author',
                attributes: ['username']
            }]
        });

        // Format the response
        const formattedBooks = books.map(book => ({
            id: book.id,
            title: book.title,
            coverImage: book.coverImage,
            authorName: book.author.username
        }));

        res.json(formattedBooks);
    } catch (error) {
        console.error('Error in getUserFavorites :(((', error);
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