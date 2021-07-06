import "./Sidebar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__item">
        <span className="sidebar__title">ABOUT</span>
        <img
          src="https://sun9-16.userapi.com/impf/kSBA4PsldPVex-bG6EE_ZzBKbPam9sAT1xirLQ/d5efLT0GkJQ.jpg?size=604x418&quality=96&sign=2d7f68776af9152b8dd0fa5cdf268576&type=album"
          alt=""
        />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae placeat
          temporibus quo quas inventore tempore sed esse consequatur eligendi
          fuga a, at corporis nisi quos totam corrupti dolor laborum animi!
        </p>
      </div>
      <div className="sidebar__item">
        {/* <span className="sidebar__title">Категории</span>
        <ul className="sidebar__list">
          {cats.map((cat, i) => (
            <Link key={i} className="link" to={`/?cat=${cat.name}`}>
              <li  className="sidebar__list-item">
                {cat.name}
              </li>
            </Link>
          ))}
        </ul> */}
      </div>
      <div className="sidebar__item">
        <span className="sidebar__title">FOLLOW US</span>
        <div className="sidebar__social">
          <i className="sidebar-icon fab fa-facebook"></i>
          <i className="sidebar-icon fab fa-twitter"></i>
          <i className="sidebar-icon fab fa-instagram"></i>
        </div>
      </div>
    </div>
  );
}
