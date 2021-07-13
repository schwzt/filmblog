import "./Mobile.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Mobile({ isOpen, toggle }) {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <aside
      className="mobile__container"
      style={
        isOpen ? { opacity: "100%", top: "0" } : { opacity: "0", top: "-100%" }
      }
    >
      <div className="mobile__icon" onClick={toggle}>
        <i class="fas fa-times"></i>
      </div>
      <div className="mobile__wrap">
        <ul className="mobile__menu">
          <li className="mobile-link">
            <Link className="link" to="/" onClick={toggle}>
              HOME
            </Link>
          </li>
          <li className="mobile-link">
            <Link className="link" to="/about" onClick={toggle}>
              ABOUT
            </Link>
          </li>
          <li className="mobile-link">
            <Link className="link" to="/contacts" onClick={toggle}>
              CONTACTS
            </Link>
          </li>
          {user ? (
            <>
              <li className="mobile-link">
                <Link className="link" to="/create" onClick={toggle}>
                  NEW POST
                </Link>
              </li>
              <li className="mobile-link" onClick={handleLogout}>
                <Link className="link" to="/" onClick={toggle}>
                  LOGOUT
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="mobile-link">
                <Link className="link" to="/login" onClick={toggle}>
                  LOG IN
                </Link>
              </li>
              <li className="mobile-link">
                <Link className="link" to="/register" onClick={toggle}>
                  SIGN UP
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Mobile;
