import React, { useContext, useState } from "react";

import axios from "axios";

import { AuthContext } from "./../context/auth";

// =================================================================

const Register = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const role = "60a881b61c678a049ca406fe";
  const [message, setMessage] = useState("");

  // =================================================================

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        role,
      });
      if (result.data.success) {
        setMessage("The user has been created successfully");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  // =================================================================

  return (
    <>
      {!isLoggedIn ? (
        <>
          <form onSubmit={addNewUser}>
            <br />
            <input
              type="text"
              placeholder="firstName here"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="lastName here"
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <input
              type="number"
              placeholder="age here"
              onChange={(e) => setAge(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="country here"
              onChange={(e) => setCountry(e.target.value)}
            />
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
            <button>Register</button>
            <br />
          </form>

          {message && <div>{message}</div>}
        </>
      ) : (
        <p>Logout First</p>
      )}
    </>
  );
};

export default Register;
