const articlesModel = require("../../db/models/articles");

// this function return all articles
const getAllArticles = (req, res) => {
  articlesModel
    .find({})
    .populate("author", "firstName lastName")
    .populate({
      path: "comments",
      populate: { path: "commenter",select: 'firstName lastName -_id', model: "User" },
    })
    .then((articles) => {
      res.status(200).json({
        success: true,
        message: `All the articles`,
        articles,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

//this function get articles by author return all his articles
const getArticlesByAuthor = (req, res) => {
  let authorName = req.query.author;

  articlesModel
    .find({ author: authorName })
    .then((articles) => {
      if (!articles.length) {
        return res.status(404).json({
          success: false,
          message: `The author => ${authorName} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the articles for the author => ${authorName}`,
        articles: articles,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

//this function get one article by specific id and return the specific article
const getAnArticleById = (req, res) => {
  let id = req.query.id;
  articlesModel
    .findById(id)
    .populate("author", "firstName -_id")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Article not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The article ${id} `,
        article: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

//this function creat new article by take the info from the req the body and push to array then it return the new one
const createNewArticle = (req, res) => {
  const { title, description } = req.body;
  const author = req.token.userId;
  const newArticle = new articlesModel({
    title,
    description,
    author,
  });

  newArticle
    .save()
    .then((article) => {
      res.status(201).json({
        success: true,
        message: ` Success Article created`,
        article: article,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

//this function update article by it's id
const updateAnArticleById = (req, res) => {
  const _id = req.params.id;

  articlesModel
    .findByIdAndUpdate(_id, req.body, { new: true })
    .populate('author', 'firstName lastName')
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Article => ${_id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: ` Success Article updated`,
        article: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

//this function delete a specific article using the id
const deleteArticleById = (req, res) => {
  const id = req.params.id;
  articlesModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Article => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Success Delete atricle with id => ${id}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

//this function delete all the articles for a specific author
const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author;

  articlesModel
    .deleteMany({ author })
    .then((result) => {
      if (!result.deletedCount) {
        return res.status(404).json({
          success: false,
          message: `The Author not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Success Delete atricles for the author => ${author}`,
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getAnArticleById,
  createNewArticle,
  updateAnArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
