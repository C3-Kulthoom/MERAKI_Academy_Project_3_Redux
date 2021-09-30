import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import { AuthContext } from "./../context/auth";

//===============================================================

const NewArticle = () => {
  const { validateToken, token, isLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  //===============================================================

  const createNewArticle = async (e) => {
    e.preventDefault();
    try {
      validateToken();

      const article = {
        title,
        description,
      };
      const result = await axios.post(
        "http://localhost:5000/articles",
        article,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result && result.data && result.data.success) {
        setMessage("The article has been created successfully");
      } else throw Error;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        !error.response.data.success
      ) {
        return setMessage(error.response.data.message);
      }
      setMessage(
        "Error happened while creating a new article, please try again"
      );
    }
  };

  //===============================================================

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/dashboard");
    }
  });

  //===============================================================
  return (
    <>
      <form onSubmit={createNewArticle}>
        <br />
        <input
          type="text"
          placeholder="article title here"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="article description here"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <button>Create New Article</button>
      </form>
      <br />
      {message && <div>{message}</div>}
    </>
  );
};

export default NewArticle;
