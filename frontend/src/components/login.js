import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {setToken} from "../action/login"
import jwt from "jsonwebtoken";
import axios from "axios";
import  {useDispatch ,useSelector }  from 'react-redux'

// import { AuthContext } from "../context/auth";

//===============================================================

const Login = () => {

  const state = useSelector((state) => {
    // state tree => reducer => state name
    return {
      token: state.login1.token,
    };
  });
  // const { setIsLoggedIn, isLoggedIn, saveToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);//////
  const [userId, setUserId] = useState("");////////
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
    // const [token, setToken] = useState("");

  //===============================================================

  const login = async (e) => {
    e.preventDefault();


    // const saveToken = (token) => {////////////////
    //   const user = jwt.decode(token);
    //   if (user) {
    //     setToken(token);
    //     setIsLoggedIn(true);
    //     setUserId(user.userId);
    //     localStorage.setItem("token", token);
    //   }
    // };


    const validateToken = () => {
      const user = jwt.decode(state.token);
      if (!user) throw new Error();
    };

/////// go to logut component 
    // const logout = () => {///////
    //   setIsLoggedIn(false);
    //   setUserId("");
    //   localStorage.clear();
    //   history.push("/login");
    // };




    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (res.data.success) {
        setMessage("");
        setIsLoggedIn(true);
      dispatch(setToken(res.data.token) )
       
      
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
