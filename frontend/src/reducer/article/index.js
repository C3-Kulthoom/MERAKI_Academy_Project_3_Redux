const initialState = {
    article : [],
  };


  export const article = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_TOKEN":
        return { token: payload };
  
      default:
        return state;
    }
  };
   export default login;