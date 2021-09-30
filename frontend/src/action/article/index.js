export const SET_ARTICLES = (articles) => {
    return {
      type: 'SET_ARTICLES',
      payload: articles,
    };
  };

  export const ADD_ARTICLE = (article) => {
    return {
      type: 'ADD_ARTICLE',
      payload: article,
    };
  };

  export const UPDATE_ARTICLE = (article) => {
    return {
      type: 'UPDATE_ARTICLE',
      payload: article,
    };
  };
  export const DELETE_ARTICLE = (id) => {
    return {
      type: 'DELETE_ARTICLE',
      payload: id,
    };
  };