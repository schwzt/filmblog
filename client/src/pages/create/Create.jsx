import "./Create.css";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

function Create() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="create">
      {file && (
        <img className="create__img" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="create__form" onSubmit={handleSubmit}>
        <div className="create__form-container">
          <label htmlFor="fileInput">
            <i className="create__icon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="create__input"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="create__form-container">
          <textarea
            className="create__input create__text"
            placeholder="Write what do you think..."
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="create__submit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Create;
