import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const getBookInfo = (bookId) => {
  const url = `${BASE_URL}/books/view/${bookId-1}`;
  return axios.get(url).then(response => response.data);
};

const getRecentBooks = () => {
  const url = `${BASE_URL}/books/recent/`;
  return axios.get(url).then(response => response.data);
};

const getBookText = (bookId) => {
  const url = `${BASE_URL}/books/read/${bookId-1}`;
  return axios.get(url).then(response => response.data);
};

const getAllBooks = () => {
  const url = `${BASE_URL}/books`;
  return axios.get(url).then(response => response.data);
};

const auth = (authData) => {
  const url = `${BASE_URL}/users/`;
  return axios.post(url, authData).then(response => response.data);
};

export { getBookInfo, getRecentBooks, getBookText, getAllBooks, auth };

export const setRecentBook = (readBook) => {
  let myInit = {
    method: 'POST',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: readBook
  }

  return fetch('/books/read/', myInit)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error);
    });
};