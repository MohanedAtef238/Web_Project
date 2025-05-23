import axios from 'axios';
import { API_BASE } from '../config/api';

// Configure axios defaults
axios.defaults.baseURL = API_BASE;

export async function createUser(data) {
  try {
    const response = await axios.post('/user/signup', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(data) {
  try {
    const response = await axios.post('/user/login', {
      inputUsername: data.username,
      inputPassword: data.password
    });
    
    console.log('Login API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login API error:', error.response?.data || error.message);
    throw error;
  }
}

export async function getAllUsers() {
  const response = await axios.get('/user/admin/users');
  return response.data;
}

export async function getUserDetails(username) {
  const response = await axios.get(`/user/${username}`);
  return response.data;
}

//added the delete user
export async function deleteUser(id){
  const response = await axios.delete(`/user/admin/${id}`);
  return response.data;
}

export async function editUser(id, username, email){
  const response = await axios.post('/user/admin/edit', {
    id, username, email
  });
  return response.data
}

//for the edit user along with editUser

export async function getUserEditProfile(id) {
  console.log("api: hi, searching with id", id);
   const response = await axios.post('/user/edituser', {
    id
  });
  return response.data
}

export async function editUserProfile({id, bio, firstname, lastname}) {
   const response = await axios.post('/user/edituser/profile', {
    id, bio, firstname, lastname
  });
  return response.data
}

export async function editUserPassword(id, oldpass, newpass ) {
  console.log("api: the id is ",id, "and password are: ", oldpass, " and ", newpass)
   const response = await axios.post('/user/edituser/password', {
    id, oldpass, newpass 
  });
  return response.data
}