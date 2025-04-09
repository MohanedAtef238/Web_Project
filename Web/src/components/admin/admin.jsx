import React, { useState } from "react";
import AdminUserslist from "./adminuserslist";
import AdminBookslist from "./adminbookslist";
import { Link } from "react-router-dom";
import Addbook from "./addbook";
import './admin.css';

const dummyusers = [
    {
        userID: 1,
        username: 'banana',
        email: 'banana@gmial.com',
        createdOn: '20/3/2024'
    },
    {
        userID: 2,
        username: 'hdj',
        email: 'fhweu',
        createdOn: '249894'
    },
    {
        userID: 3,
        username: 'uhrf',
        email: 'foue',
        createdOn: '4792'
    },
    {
        userID: 4,
        username: 'cbur',
        email: 'unre',
        createdOn: '834'
    },
    {
        userID: 5,
        username: 'curc',
        email: 'curcahuef',
        createdOn: '247233'
    },
]

const dummybooks = [
    {
        bookID: 1,
        title: 'hamefd',
        genre: 'horror',
        file_url: 'url',
        cover_image_url: '../../assets/react.svg',
        duration: '03:20:03'
    },
    {
        bookID: 2,
        title: 'poyrte',
        genre: 'romance',
        file_url: 'url',
        cover_image_url: '../../assets/react.svg',
        duration: '02:15:03'
    },
    {
        bookID: 3,
        title: 'gbgb',
        genre: 'habiba',
        file_url: 'url',
        cover_image_url: '../../assets/react.svg',
        duration: '10:10:10'
    },
]


function Admin(){
    // const [ viewAddUser, setAddUser] = useState(false);
    // const [ viewAddUser, setAddUser] = useState(false);

    return(
        <div className="dashboard-wrapper">
            <div className="dashboard-header">
                <h2 className="dashboard-title">Admin Page hehehe</h2>
                <Link to='/'>
                    <button>Logout</button>
                </Link>
            </div>
            
            <div className="dashboard-section">
            <AdminUserslist users={dummyusers}/>
            <Link to="./adduser">
                <button>Add new user</button>
            </Link>
            <br/>
            </div>
            <div className="dashboard-section">
            <AdminBookslist books={dummybooks}/>
            <Link to="./addbook">
                <button>Add new book</button>
            </Link>
            </div>
            {/* {!viewAddUser? <button onClick={ () => {setAddUser(true)}}>
                Add user
            </button>
            : 
                <div>
                    <Addbook/>
                    <br/>
                    <button onClick={ () => {setAddUser(false)}}>Don't add user</button>
                </div>

            } */}
        </div>
       
    )
}

export default Admin;