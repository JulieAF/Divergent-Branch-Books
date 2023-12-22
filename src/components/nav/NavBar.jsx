import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "./logo.png";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  // const hamburger = useRef();

  // const showMobileNavbar = () => {
  //   hamburger.current.classList.toggle("is-active");
  //   navbar.current.classList.toggle("is-active");
  // };

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
          {/* <h1 className="title is-4">Divergent Branch Books</h1> */}
        </a>

        {/* <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          // onClick={showMobileNavbar}
          // ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> */}
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {token ? (
            <>
              <Link to="/" className="navbar-item">
                Books
              </Link>
              <Link to="/reviews" className="navbar-item">
                Reviews
              </Link>
              <Link to="/profile" className="navbar-item">
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
                  className="button is-outlined"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                >
                  {"LOGOUT"}
                </button>
              ) : (
                <>
                  <Link to="/login" className="button is-outlined">
                    Login
                  </Link>
                  <Link to="/register" className="button is-link">
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
