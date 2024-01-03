import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import "./auth.css";

export const Register = ({ setToken }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const profile_image_url = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        profile_image_url: profile_image_url.current.value,
        bio: bio.current.value,
      };

      registerUser(newUser).then((res) => {
        if ("token" in res && res.token) {
          setToken(res.token);
          navigate("/");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <section className="column">
      <form className="form" onSubmit={handleRegister}>
        <h1 className="title">Divergent Branch Books</h1>
        <p className="subtitle">Create an account</p>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  ref={password}
                />
              </p>
            </div>

            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Verify Password"
                  ref={verifyPassword}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Bio</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Tell us about yourself..."
              ref={bio}
            ></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Profile Picture</label>
          <div className="control">
            <textarea
              className="input"
              placeholder="http://www.image.com"
              ref={profile_image_url}
            ></textarea>
          </div>
        </div>

        <div className="button-field">
          <div className="control">
            <button className="button-submit" type="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <Link to="/login" className="button-submit">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
