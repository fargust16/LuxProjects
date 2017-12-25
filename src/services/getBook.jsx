export const getBookById = (bookId) => {
  return fetch('/books/view/' + (bookId - 1))
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getAllBooks = () => {
  return fetch('/books')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error);
    });
}