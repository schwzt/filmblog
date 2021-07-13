import "./Settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Settings() {
  let history = useHistory();
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [pass, setPass] = useState(user.password);
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

  console.log(updatedUser)
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

  const handleDelete = async (e) => {
    const deleteUser = {
      userId: user._id,
    };
    try {
      dispatch({ type: "LOGOUT" });
      await axios.delete(`/api/user/${user._id}`, { data: deleteUser });
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="settings">
      <div className="settings__container">
        <div className="settings__title">
          <span className="settings__title-update">Profile settings</span>
          <span className="settings__title-delete" onClick={handleDelete}>
            Delete profile
          </span>
        </div>
        <form className="settings__form" onSubmit={handleSubmit}>
          <label>Profile image</label>
          <div className="settings__profile">
            <img
              className="settings__profile-picture"
              src={file ? URL.createObjectURL(file) : `/${user.photo}`}
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input type="password" placeholder="Enter password for saving" onChange={(e) => setPass(e.target.value)} />
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
