import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './table.css';
import { deleteUser, getAllUsers } from '../../api/userAPI'; 

const AdminUserslist = () => {
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate();

  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error('Fetch users error:', err);
      }
    }
    fetchUsers();
  }, []); 



  async function handleDeleteUser(userId) {
    try {
      await deleteUser(userId); 
      setUsers(users.filter((user) => user.id !== userId));
      console.log(`User with ID ${userId} deleted`);
    } catch (err) {
      console.error('Delete user error:', err);
    }
  }

  return (
    <div>
      <div className="title">
        <h3 className="title-name">Users list</h3>
        <input className="title-search" placeholder="username or email" />
      </div>
      <table className="table-styling">
        <thead>
          <tr>
            <th className="th-td-styling">Username</th>
            <th className="th-td-styling">Email</th>
            <th className="th-td-styling">Creation date</th>
            <th className="th-td-styling"></th>
          </tr>
        </thead>
        <tbody className="scrolling-table">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td className="th-td-styling">{user.username}</td>
                <td className="th-td-styling">{user.email}</td>
                <td className="th-td-styling">{user.createdOn}</td>
                <td className="th-td-styling">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="th-td-styling">
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserslist;