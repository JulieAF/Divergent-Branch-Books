import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";
import "./auth.css";

export const Login = ({ setToken }) => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    loginUser(user).then((res) => {
      if ("token" in res && res.token) {
        setToken(res.token);
        navigate("/");
      } else {
        setIsUnsuccessful(true);
      }
    });
  };

  return (
    <section className="column">
      <form className="form" onSubmit={handleLogin}>
        <h1 className="title">Divergent Branch Books</h1>
        <p className="subtitle">Please sign in</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} />
          </div>
        </div>

        <div className="button-field">
          <div className="control">
            <button className="button-submit" type="submit">
              Submit
            </button>
          </div>
        </div>
        {isUnsuccessful ? (
          <p className="warning">Username or password not valid</p>
        ) : (
          ""
        )}
      </form>
    </section>
  );
};
