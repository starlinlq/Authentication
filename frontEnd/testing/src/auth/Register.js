import Axios from "axios";
import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";

function Register() {
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [
    data = {
      email: "",
      password: "",
      passwordCheck: "",
      displayName: "",
    },
    setData,
  ] = useState();

  function getEmail(e) {
    setData({ ...data, email: e.target.value });
  }
  function getPassword(e) {
    setData({ ...data, password: e.target.value });
  }
  function checkPassword(e) {
    setData({ ...data, passwordCheck: e.target.value });
  }
  function getName(e) {
    setData({ ...data, displayName: e.target.value });
  }

  async function sendData(e) {
    e.preventDefault();
    const newUser = {
      email: data.email,
      password: data.password,
      displayName: data.displayName,
      passwordCheck: data.passwordCheck,
    };

    await Axios.post("http://localhost:5000/users/register", newUser);

    const loginRes = await Axios.post("http://localhost:5000/users/login", {
      email: data.email,
      password: data.password,
    });

    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    history.push("/");
  }

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={sendData}>
        <label htmlFor="register-email">Email</label>
        <input
          onChange={getEmail}
          id="register-email"
          type="email"
          value={data.email}
        />
        <label htmlFor="register-password">password</label>
        <input
          onChange={getPassword}
          id="register-password"
          type="password"
          value={data.password}
        />
        <input
          onChange={checkPassword}
          placeholder="verify password"
          type="password"
          value={data.passwordCheck}
        />
        <label htmlFor="register-display-name">display name</label>
        <input
          onChange={getName}
          id="register-display-name"
          type="text"
          value={data.displayName}
        />
        <button>submit</button>
      </form>
    </>
  );
}

export default Register;
