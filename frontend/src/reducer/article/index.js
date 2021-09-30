const initialState = {
    article : [],
  };


  export const articles = (state = initialState, { type, payload }) => {
    switch (type) {

        case "SET_ARTICLES":
         return {articles: [...payload]  }; 

      case "ADD_ARTICLE":
        return { articles: [...state.article, payload]};
  
        case "UPDATE_ARTICLE":
            return {
                articles: state.article.map((element) => {
                  if (element.id === payload.id) {
                    element = payload 
                    return element 
                  } else {
                    return element;
                  }
                }),
              };


  case "DELETE_ARTICLE":
    return {
        articles: state.article.filter(
          (element) => element.id !== payload.id,
        ),
      };


      default:
        return state;
    }
  };
   export default articles;