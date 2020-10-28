import Axios from "axios";
import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
function Login() {
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [
    data = {
      email: "",
      password: "",
    },
    setData,
  ] = useState();

  function getEmail(e) {
    setData({ ...data, email: e.target.value });
  }
  function getPassword(e) {
    setData({ ...data, password: e.target.value });
  }

  async function sendData(e) {
    e.preventDefault();
    const logInUser = {
      email: data.email,
      password: data.password,
    };

    const loginRes = await Axios.post(
      "http://localhost:5000/users/login",
      logInUser
    );

    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    history.push("/");
  }
  return (
    <>
      <h2>Login</h2>
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
        <button>Submit</button>
      </form>
    </>
  );
}

export default Login;
