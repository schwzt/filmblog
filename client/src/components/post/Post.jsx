import "./Post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  // const PF = "http://localhost:8000/images/";
  return (
    <div className="post">
      {post.photo && <img className="post__img" src={`/${post.photo}`} alt="" />}
      <div className="post__info">
        {/* <div className="post__categories">
          {post.categories.map((cat, i) => (
            <span key={i} className="post__cat">
              cat.name
            </span>
          ))}
        </div> */}
        <Link className="link" to={`/post/${post._id}`}>
          <span className="post__title">{post.title}</span>
        </Link>
        <hr />
        <span className="post__date">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="post__description">{post.desc}</p>
    </div>
  );
}
