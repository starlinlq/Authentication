import React,{useContext} from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext"

function AuthOptions() {
  const {userData, setUserData} = useContext(UserContext);

  const history = useHistory();
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = ()=>{
    setUserData({
    user: undefined,
    token: undefined
  })
  localStorage.setItem("auth-token", "");
  }
  return (
    <nav className="options">
    {userData.user? 
    <button onClick={logout}>Log Out </button>:
    <>
      <button onClick={register}>Register</button>
      <button onClick={login}>Log in</button>
      </>
    }
    
    </nav>
  );
}

export default AuthOptions;
