import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Navbar({toggle}) {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="navbar">
      <div className="navbar__left">
        <a href="https://www.facebook.com/" rel="noreferrer" target="_blank">
          <i className="navbar-icon fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com/" rel="noreferrer" target="_blank">
          <i className="navbar-icon fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
          <i className="navbar-icon fab fa-instagram"></i>
        </a>
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
        
      </div>
      <div className="icon-mobile" onClick={toggle}>
          <i class="fas fa-bars"></i>
        </div>
    </div>
  );
}

export default Navbar;
