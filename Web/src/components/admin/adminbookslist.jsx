import React from 'react';
import { Link } from 'react-router-dom';
import { deleteBook } from '../../api/bookAPI';
// added these to avoid refreshing the page when deleting a book, we'll instead recall the api that fetches the books
import { getAdminBookList } from "../../api/bookAPI";
import './table.css';

const AdminBookslist = ({ books, fetchBooks}) => {
    return(
        <div>
            <div className='title'>
                <h3 className='title-name'>Users list</h3>
                <input className="title-search" placeholder='username or email'/>
            </div>
          
            <table className='table-styling '>
                <thead>
                    <tr>
                        <th className='th-td-styling'>
                            
                        </th>
                        <th className='th-td-styling'>
                            Title
                        </th>
                        <th className='th-td-styling'>
                            Genre
                        </th>
                        <th className='th-td-styling'>
                            Duration
                        </th>
                        
                    </tr>
                </thead>
                    <tbody className="scrolling-table">
                    {books && books.map(
                        (book) => (
                            <tr key={book.id}>
                                <td className='th-td-styling'>
                                    <Link to={book.file_url}>
                                        <img src={book.cover_image_url} className="book-cover-img" />
                                    </Link>
                                </td>
                                <td className='th-td-styling'>
                                    {book.title}
                                </td>
                                <td className='th-td-styling'>
                                    {book.genre}
                                </td>
                                <td className='th-td-styling'>
                                    {book.duration}
                                </td>
                                <td>
                                <button
                                className='delete-button'
                                onClick={async () => {
                                    try { await deleteBook(book.id); await fetchBooks();} 
                                    catch (error) {console.error(error);}}}>
                                X
                                </button>
                                </td>
                            </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
          

    )
}

export default AdminBookslist;