import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const getBookInfo = (bookId) => {
    const url = `${BASE_URL}/books/view/${bookId}`;
    return axios.get(url).then(response => response.data);
};

const getRecentBooks = (userId) => {
    const url = `${BASE_URL}/books/recent/${userId}`;
    return axios.get(url).then(response => response.data);
};

const getBookText = (bookId, textParams) => {
    const url = `${BASE_URL}/books/read/${bookId}`;
    return axios.post(url, textParams).then(response => response.data);
};

const getAllBooks = () => {
    const url = `${BASE_URL}/books/all-books`;
    return axios.get(url).then(response => response.data);
};

const addBook = (bookData) => {
    const url = `${BASE_URL}/books/add-book`;
    return axios.post(url, bookData).then(response => response.data);
};

const addRecentBook = (recentData) => {
    const url = `${BASE_URL}/books/add-recent-book`;
    return axios.put(url, recentData).then(response => response.data);
};

const addComment = (commentData) => {
    const url = `${BASE_URL}/books/add-comment`;
    return axios.post(url, commentData).then(response => response.data);
};

const addReview = (review) => {
    const url = `${BASE_URL}/books/add-review`;
    return axios.put(url, review).then(response => response.data);
};

const signIn = (authData) => {
    const url = `${BASE_URL}/users/sign-in`;
    return axios.post(url, authData).then(response => response.data);
};

const signUp = (authData) => {
    const url = `${BASE_URL}/users/add-user`;
    return axios.put(url, authData).then(response => response.data);
};

const updateUserData = (userData) => {
    const type = userData.type;
    const url = `${BASE_URL}/users/update-user-${type}`;
    return axios.put(url, userData).then(response => response.data);
};

const getListOfGenres = () => {
    const url = `${BASE_URL}/books/get-genres`;
    return axios.get(url).then(response => response.data);
};

const mailToSupport = (mailData) => {
    const url = `${BASE_URL}/mail-to-support`;
    return axios.post(url, mailData).then(response => response.data);
};

const getSearchResults = (searchParams) => {
    const url = `${BASE_URL}/search-results/${searchParams}`;
    return axios.get(url).then(response => response.data);
};


export {getBookInfo, getRecentBooks, addComment, getAllBooks, signIn, signUp, updateUserData, addBook,
    getBookText, addReview, getListOfGenres, mailToSupport, addRecentBook, getSearchResults};