import "./Settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:8000/images/";
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      pass,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.photo = fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.patch(`/api/user/${user._id}`, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  return (
    <div className="settings">
      <div className="settings__container">
        <div className="settings__title">
          <span className="settings__title-update">Profile settings</span>
          <span className="settings__title-delete">Delete profile</span>
        </div>
        <form className="settings__form" onSubmit={handleSubmit}>
          <label>Profile image</label>
          <div className="settings__profile">
            <img
              className="settings__profile-picture"
              src={file ? URL.createObjectURL(file) : `../../../../images/${user.photo}`}
              alt=""
            />
            <label htmlFor="fileInput" className="fileInput">
              <i className="settings__picture-icon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input type="password" onChange={(e) => setPass(e.target.value)} />
          <button className="settings__submit" type="submit">
            Save
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Changes successfully saved!
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
