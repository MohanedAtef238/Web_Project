import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function createUser({ username, email, password }) {
  const response = await axios.post(`${API_BASE}/user/signup`, {
    username,
    email,
    password,
  });
  return response.data;
}

export async function login({ username, password }) {
  const response = await axios.post(`${API_BASE}/user`, {
    inputUsername: username,
    inputPassword: password
  });
  if (response.status === 200) {
    const userData = response.data;
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }
  
  throw new Error('Login failed');
}

export async function getAllUsers() {
    console.log("using the api bow to fetch users");
    // const response1 = await axios.get(`${API_BASE}/admin`);
    // console.log('logging result from /admin 3alatool: ', response1.data);
    // const response = await axios.get(`${API_BASE}/user/admin`);

    const response = await axios.get(`${API_BASE}/user/admin`);
    console.log("if this logs then error not in api");

    return response.data;
}

export async function getUserDetails(username) {
  const response = await axios.get(`${API_BASE}/user/${username}`);
  return response.data;
}

//added the delete user
export async function deleteUser(id){
  const response = await axios.delete(`${API_BASE}/user/admin/${id}`);
  return response.data;
}