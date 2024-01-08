import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "./logo.png";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-logo-group" href="/">
          <img
            className="navbar-logo"
            src={Logo}
            height="3rem"
            alt="Divergent Logo"
          />{" "}
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {token ? (
            <>
              <Link
                style={{
                  background: "transparent",
                }}
                to="/"
                className="navbar-item"
              >
                Books
              </Link>
              <Link
                style={{
                  background: "transparent",
                }}
                to="/reviews"
                className="navbar-item"
              >
                Reviews
              </Link>
              <Link
                style={{
                  background: "transparent",
                }}
                to="/profile"
                className="navbar-item"
              >
                Profile
              </Link>
            </>
          ) : (
            ""
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-logout">
            <div className="buttons">
              {token ? (
                <button
                  className="button"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                >
                  {"LOGOUT"}
                </button>
              ) : (
                <>
                  <Link to="/login" className="button button-login">
                    Login
                  </Link>
                  <Link to="/register" className="button button-register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
