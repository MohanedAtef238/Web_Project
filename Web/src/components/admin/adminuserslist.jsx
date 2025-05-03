import React from 'react';
import { useState, useEffect } from 'react';
import './table.css';
import { deleteUser } from '../../api/userAPI';

const AdminUserslist = ({ users }) => {

    const [usersList, setUsersList] = useState(users);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setUsersList(users);
    }, [users]);

    const deleteFromUser = async (id) => {
        try {
            await deleteUser(id);
            setUsersList(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            console.error('Failed to delete user:', error.message);
        }
    };

    const filteredUsers = usersList.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div>
            <div className='title'>
                <h3 className='title-name'>Users list</h3>
                <input className="title-search" placeholder='username or email'
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <table className='table-styling '>
                <thead>
                    <tr>
                        <th className='th-td-styling'>
                            Username
                        </th>
                        <th className='th-td-styling'>
                            Email
                        </th>
                        <th className='th-td-styling'>
                            Creation date
                        </th>
                        <th className='th-td-styling'/>
                    </tr>
                </thead>
                {/* <div className="scrolling-table"> */}
                    <tbody className="scrolling-table">
                        {filteredUsers && filteredUsers.map(
                            (user) => (
                                <tr key={user.id}>
                                    <td className='th-td-styling'>
                                    {user.username}
                                    </td>
                                    <td className='th-td-styling'>
                                    {user.email}
                                    </td>
                                    <td className='th-td-styling'>
                                        {/* {console.log('user creteaion: ', user.createdOn)} */}
                                    {new Date(user.createdAt).toLocaleString()}
                                    </td>
                                    <td className='th-td-styling'>
                                        <button className='delete-button' onClick={() => deleteFromUser(user.id)}>X</button>
                                    </td>
                                </tr>
                                )
                        )}
                    </tbody>
                {/* </div> */}

            </table>
            {filteredUsers.length == 0?
                    searchTerm === ''?  <div>
                        No books in database
                    </div>
                    :
                    <div>
                        Nothing matches the search
                    </div>
                    :
                    <div/>
                }
        </div>
    )
}
export default AdminUserslist;
