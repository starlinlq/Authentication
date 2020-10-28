import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../../auth/AuthOptions";

function Header() {
  return (
    <header id="header">
      <div>
        <Link to="/home">
          <h1 className="title">MERN auth</h1>
        </Link>
      </div>
      <AuthOptions></AuthOptions>
    </header>
  );
}

export default Header;
