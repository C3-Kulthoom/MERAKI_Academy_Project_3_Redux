// import React, { useContext } from "react";
import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// import { AuthContext } from "../context/auth";

//===============================================================

const Navigation = () => {
  const history = useHistory();

  // const { logout, isLoggedIn } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  //===============================================================
 const logout = () => {///////
      setIsLoggedIn(false);
      setUserId("");
      localStorage.clear();
      history.push("/login");
    };
  return (
    <>
      {isLoggedIn ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <Link to="/newArticle">Add New Article</Link>
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <Link to="/login">Login</Link>
        </>
      )}
    </>
  );
};

export default Navigation;
