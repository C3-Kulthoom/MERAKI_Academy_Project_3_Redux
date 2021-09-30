import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import { AuthContext } from "../context/auth";

//===============================================================

const Login = () => {
  const { setIsLoggedIn, isLoggedIn, saveToken } = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  //===============================================================

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (res.data.success) {
        setMessage("");
        saveToken(res.data.token);
        setIsLoggedIn(true);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  //===============================================================

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  });

  //===============================================================

  return (
    <>
      {/* {!isLoggedIn ? (
        <> */}
      <form onSubmit={login}>
        <br />

        <input
          type="email"
          placeholder="email here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password here"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Login</button>
      </form>

      {message && <div>{message}</div>}
    </>
    //   ) : (
    //     history.push("/dashboard")
    //   )}
    // </>
  );
};

export default Login;
