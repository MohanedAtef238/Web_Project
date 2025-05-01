const { Book, User } = require('../models');


const getAdminBookList = async (req, res) => {
    try { 
        const books = await Book.findAll({ attributes: ['id', 'title', 'genre', 'duration'] });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserBooks = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const books = await Book.findAll({
            where: { authorId: user.id },
            attributes: ['id', 'title', 'duration']
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

const addAdminBook = async (req, res) => {
    try {
        const { coverImage, title, genre, audioFile} = req.body;

        const book = await Book.create({
            title,
            genre,
            coverImage,
            audioFile,
            authorId: "2f49f1fc-1405-4a77-a8e4-a19cf4379b8a"
        });

        res.status(201).json(book);
    } catch (error) {
        console.error('Error in addBook:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await book.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error in deleteBook:', error);
        res.status(500).json({ error: error.message });
    }
}
// No UI currently so not using it 
// const updateBook = async (req, res) => { 
//     try {
//         const { bookId } = req.params;
//         const { title, genre, coverImage, audioFile } = req.body;

//         const book = await Book.findByPk(bookId);

//         if (!book) {
//             return res.status(404).json({ error: 'Book not found' });
//         }

//         await book.update({ title, genre, coverImage, audioFile });
//         res.status(200).json(book);
//     } catch (error) {
//         console.error('Error in updateBook:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

module.exports = {getUserBooks,getBookDetails,addAdminBook, getAdminBookList, deleteBook}; 