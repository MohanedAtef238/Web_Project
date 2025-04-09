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
                            <tr key={book.bookID}>
                                <td className='th-td-styling'>
                                    <Link to={book.file_url}>
                                        <img src={book.cover_image_url} className="book-cover-img" />
                                    </Link>  {/* use file_url to redirect later */}
                                </td>
                                <td className='th-td-styling'>
                                    {book.title}
                                </td>
                                <td className='th-td-styling'>
                                    {book.genre}
                                </td>
                                <td className='th-td-styling'>
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