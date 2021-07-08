import "./ErrorPage.css";
import { Link } from "react-router-dom";

function ErrorPage(props) {
  return (
    <div className="error">
      <span className="error__title-lg">Oops!</span>
      <span className="error__title-sm">
        The page you are looking for doesn't exist
      </span>
      <p className="error__info">Click this button to return home!</p>
      <button className="error__btn">
        <Link  className="link-err" to="/">Go to Home Page</Link>
      </button>
    </div>
  );
}

export default ErrorPage;
