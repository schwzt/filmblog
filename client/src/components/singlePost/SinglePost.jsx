import "./SinglePost.css";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import { useLocation, Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function SinglePost() {
  let history = useHistory();
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  // const PF = "http://localhost:8000/images/";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [upd, setUpd] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async (e) => {
    try {
      await axios.delete("/api/posts/" + path, {
        data: { username: user.username },
      });
      history.push("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.patch("/api/posts/" + path, {
        username: user.username,
        title,
        desc,
      });
      setUpd(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePost-container">
        {post.photo && (
          <img src={`../../../../images/${post.photo}`} alt="" className="singlePost__img" />
        )}
        {upd ? (
          <input
            type="text"
            value={title}
            className="singlePost__title-input"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePost__title">
            {title}
            {post.username === user?.username && (
              <div className="singlePost__edit">
                <i
                  className="singlePost__icon far fa-edit"
                  onClick={() => setUpd(true)}
                ></i>
                <i
                  className="singlePost__icon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePost__info">
          <span className="singlePost__author">
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePost__date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {upd ? (
          <textarea
            value={desc}
            className="singlePost__desc-input"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePost__desc">{desc}</p>
        )}
        {upd && (
          <button className="singlePost__btn" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
