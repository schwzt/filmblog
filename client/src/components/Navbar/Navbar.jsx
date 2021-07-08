import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Navbar() {
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:8000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="navbar">
      <div className="navbar__left">
        <i className="navbar-icon fab fa-facebook"></i>
        <i className="navbar-icon fab fa-twitter"></i>
        <i className="navbar-icon fab fa-instagram"></i>
      </div>
      <div className="navbar__center">
        <ul className="navbar__list">
          <li className="navbar-item">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="link" to="/contacts">
              CONTACTS
            </Link>
          </li>
          {user && (
            <li className="navbar-item">
              <Link className="link" to="/create">
                NEW POST
              </Link>
            </li>
          )}
          {user && (
            <li className="navbar-item" onClick={handleLogout}>
              <Link className="link" to="/">
                LOGOUT
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar__right">
        {user ? (
          <Link to="/settings">
            <img className="navbar-img" src={`/${user.photo}`} alt="" />
          </Link>
        ) : (
          <ul className="navbar__list">
            <li className="navbar-item">
              <Link className="link" to="/login">
                LOG IN
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="link" to="/register">
                SIGN UP
              </Link>
            </li>
          </ul>
        )}

        {/* <i className="search-icon fas fa-search"></i> */}
      </div>
    </div>
  );
}

export default Navbar;
