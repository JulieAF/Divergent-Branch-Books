export const getAllBooks = () => {
  return fetch(`http://localhost:8000/books`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getBookByBookId = (bookId) => {
  return fetch(`http://localhost:8000/books/${bookId}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const editBook = (updatedBook) => {
  return fetch(`http://localhost:8000/books/${updatedBook.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });
};

export const deleteBook = (bookId) => {
  return fetch(`http://localhost:8000/books/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  });
};
