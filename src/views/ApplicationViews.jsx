import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Profile } from "../pages/Profile";
import { ReviewList } from "../pages/ReviewList";
import BookList from "../pages/BookList";
import { BookForm } from "../components/forms/BookForm";
import { BookDetails } from "../pages/BookDetails";

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
          path="/bookLists/:bookId"
          element={<BookDetails token={token} setToken={setToken} />}
        />
        <Route
          path="/create-book"
          element={<BookForm token={token} setToken={setToken} />}
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
