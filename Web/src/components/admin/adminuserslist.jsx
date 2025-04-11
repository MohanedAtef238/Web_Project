import React from 'react';
import './table.css';

const AdminUserslist = ({ users }) => {
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
                        {users && users.map(
                            (user) => (
                                <tr>
                                    <td className='th-td-styling'>
                                    {user.username}
                                    </td>
                                    <td className='th-td-styling'>
                                    {user.email}
                                    </td>
                                    <td className='th-td-styling'>
                                    {user.createdOn}
                                    </td>
                                    <td className='th-td-styling'>
                                        <button className='delete-button'>X</button>
                                    </td>
                                </tr>
                                )
                        )}
                    </tbody>
                {/* </div> */}

            </table>
        </div>
    )
}
export default AdminUserslist;