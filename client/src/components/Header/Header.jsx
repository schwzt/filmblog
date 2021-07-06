import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header__titles">
        <span className="header__title-sm">blog</span>
        <span className="header__title-lg">Daily Film</span>
      </div>
      <img
        className="header__img"
        src="https://sun9-35.userapi.com/impg/6uA9I4ugj7JCZbcb8s2OPyVXRYF6GxTCZYyPMw/ObF5BEBv9sE.jpg?size=2560x1697&quality=96&sign=feae0dccf30d52108a8ae1cf4c6dffbd&type=album"
        alt=""
      />
    </div>
  );
}
