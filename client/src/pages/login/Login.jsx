import "./Login.css";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import axios from "axios";

function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const {  dispatch, isFetching, error } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/api/auth/login", {
        email: emailRef.current.value,
        password: passRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL" });
    }
  };

  return (
    <div className="login">
      <span className="login__title">Login</span>
      <form className="login__form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="login__input"
          type="text"
          placeholder="Email"
          ref={emailRef}
        />
        <label>Password</label>
        <input
          className="login__input"
          type="password"
          placeholder="Enter your password"
          ref={passRef}
        />
        <button className="login__btn" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="login__btn-register">
        <Link className="link" to="/register">
          Sign Up
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

export default Login;
