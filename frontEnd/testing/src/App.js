import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Header from "./components/layout/Header";
import "./style.css";
import UserContext from "./context/UserContext";
import Axios from "axios";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if(tokenRes.data){
        const userRes = await Axios.get("http://localhost:5000/users", {headers: {"x-auth-token": token}})
        setUserData({
        user: userRes.data,
      })
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
