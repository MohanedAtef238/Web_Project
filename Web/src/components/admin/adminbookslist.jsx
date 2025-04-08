import React from 'react';
import { Link } from 'react-router-dom';

import './table.css';

const AdminBookslist = ({ books }) => {
    return(
        <div>
            <div className='title'>
                <h3 className='title-name'>Users list</h3>
                <input className="title-search" placeholder='username or email'/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Genre
                        </th>
                        <th>
                            Duration
                        </th>
                    </tr>
                </thead>
                <tbody>
                {books && books.map(
                    (book) => (
                        <tr key={book.bookID}>
                            <td>
                                <Link to={book.file_url}>
                                    <img src={book.cover_image_url} className="book-cover-img" />
                                </Link>  {/* use file_url to redirect later */}
                            </td>
                            <td>
                                {book.title}
                            </td>
                            <td>
                                {book.genre}
                            </td>
                            <td>
                                {book.title}
                            </td>
                            <td>
                            <button className='delete-button'>X</button>
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