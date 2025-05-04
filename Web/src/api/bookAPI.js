import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function getUserBooks(username) {
  const response = await axios.get(`${API_BASE}/books/user/${username}`);
  return response.data;
}

export async function getBookDetails(bookId) {
  const response = await axios.get(`${API_BASE}/books/details/${bookId}`);
  return response.data;
}

export async function getAdminBookList(){
  const response = await axios.get(`${API_BASE}/books/admin/books`);
  return response.data;
}

export async function addAdminBook(formData) {
  const response = await axios.post( // this was changed to send a formdata acknowledgement instead of expecting a json object, formdata will allow us to send files to be recorded in the database or the current file strucutre temporarily
    `${API_BASE}/books/admin/book/add`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
}

export async function deleteBook(bookId) {
  console.log("Deleting book:", bookId);
  const response = await axios.post(`${API_BASE}/books/delete/${bookId}`);
  return response.data;
}