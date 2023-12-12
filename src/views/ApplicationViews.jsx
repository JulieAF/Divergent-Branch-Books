import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Profile } from "../pages/Profile";
import { ReviewList } from "../pages/ReviewList";
import BookList from "../pages/BookList";
import { BookForm } from "../components/forms/BookForm";
import { BookDetails } from "../pages/BookDetails";
import { EditBookForm } from "../components/forms/EditBookForm";
import { Review } from "../pages/Review";
import { ReviewForm } from "../components/forms/ReviewForm";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="/" element={<BookList setToken={setToken} />} />
        </Route>
        <Route
          path="/bookList/:bookId"
          element={<BookDetails token={token} setToken={setToken} />}
        />
        <Route
          path="/bookList/:bookId/edit-book"
          element={<EditBookForm token={token} setToken={setToken} />}
        />
        <Route
          path="/create-book"
          element={<BookForm token={token} setToken={setToken} />}
        />
        <Route
          path="/bookList/:bookId/review"
          element={<Review token={token} setToken={setToken} />}
        />
        <Route
          path="/create-review/:bookId"
          element={<ReviewForm token={token} setToken={setToken} />}
        />
        <Route
          path="/reviews"
          element={<ReviewList token={token} setToken={setToken} />}
        />
        <Route
          path="/profile"
          element={<Profile token={token} setToken={setToken} />}
        />
      </Routes>
    </>
  );
};
