const { Book, User, ReadingProgress } = require('../models');

const getReadingProgress = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const progress = await ReadingProgress.findOne({
            where: { userId, bookId },
            include: [
                { model: User, as: 'user' },
                { model: Book, as: 'book' }
            ]
        });

        // if (!progress) {
        //     return res.status(404).json({ error: 'Reading progress not found' });
        // }

        res.status(200).json(progress);
    } catch (error) {
        console.error('Error in getReadingProgress:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateReadingProgress = async (req, res) => {
    try {
        const { userId, bookId, currentTime } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        let progress = await ReadingProgress.findOne({
            where: { userId, bookId }
        });

        if (progress) {
            progress.currentTime = currentTime;
            await progress.save();
        } else {
            progress = await ReadingProgress.create({
                userId,
                bookId,
                currentTime
            });
        }

        res.status(200).json(progress);
    } catch (error) {
        console.error('Error in updateReadingProgress:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getReadingProgress,
    updateReadingProgress
};