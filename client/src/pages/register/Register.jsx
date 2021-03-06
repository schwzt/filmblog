import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      res.data && history.push('/login');
    } catch (err) {
      setError(true);
      console.log(err.message);
    }
  };
  return (
    <div className="register">
      <span className="register__title">Register</span>
      <form className="register__form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="register__input"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="register__input"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="register__input"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register__btn" type="submit">
            Sign Up
        </button>
      </form>
      <button className="register__btn-login">
        {" "}
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong! Please try again
        </span>
      )}
    </div>
  );
}

export default Register;
