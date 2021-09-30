import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { AuthContext } from "../context/auth";
//===============================================================

const Dashboard = () => {
  const { userId } = useContext(AuthContext);

  const [articles, setArticles] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [articleId, setArticleId] = useState(false);
  const [message, setMessage] = useState("");

  //===============================================================

  const getAllArticles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/articles");
      if (res && res.data && res.data.success) {
        setArticles(res.data.articles);
        setMessage("");
        setShow(true);
      } else throw Error;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        !error.response.data.success
      ) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================

  const handleUpdateClick = (article) => {
    setUpdateBox(!updateBox);
    setArticleId(article._id);
    setTitle(article.title);
    setDescription(article.description);
    if (updateBox) updateArticle(article._id);
  };

  //===============================================================

  const updateArticle = async (id) => {
    try {
      await axios.put(`http://localhost:5000/articles/${id}`, {
        title,
        description,
      });
      getAllArticles();
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      getAllArticles();
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  useEffect(() => {
    getAllArticles();
  }, []);

  //===============================================================

  return (
    <>
      <br />
      <button onClick={getAllArticles}>Get All Articles</button>
      {show &&
        articles.map((article, index) => (
          <div key={index}>
            <div>Title: {article.title}</div>
            <div>Description: {article.description}</div>
            <div>author: {article.author.firstName}</div>
            {article.author._id === userId && (
              <>
                {updateBox && articleId === article._id && (
                  <form>
                    <br />
                    <input
                      type="text"
                      defaultValue={article.title}
                      placeholder="article title here"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />

                    <textarea
                      placeholder="article description here"
                      defaultValue={article.description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </form>
                )}
                <button onClick={() => deleteArticle(article._id)}>X</button>
                <button onClick={() => handleUpdateClick(article)}>
                  Update
                </button>
              </>
            )}
            <hr />
          </div>
        ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Dashboard;
