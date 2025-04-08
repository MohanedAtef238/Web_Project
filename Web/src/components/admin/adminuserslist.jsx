import React from 'react';
import './table.css';

const AdminUserslist = ({ users }) => {
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
                            Username
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Creation date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(
                        (user) => (
                            <tr>
                                <td>
                                {user.username}
                                </td>
                                <td>
                                {user.email}
                                </td>
                                <td>
                                {user.createdOn}
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
export default AdminUserslist;