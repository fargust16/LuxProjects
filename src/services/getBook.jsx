export const getBookInfo = (bookId) => {
  return fetch('/books/view/' + (bookId - 1))
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getRecentBooks = () => {
  return fetch('/books/recent/')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error);
    });
}

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
}

export const getBookText = (bookId) => {
  return fetch('/books/read/' + (bookId - 1))
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