export const getAllReviews = () => {
  return fetch(`http://localhost:8000/reviews`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const createReviews = (review) => {
  return fetch(`http://localhost:8000/reviews`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  }).then((res) => res.json());
};
