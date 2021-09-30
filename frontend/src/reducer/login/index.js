const initialState = {
    token : "",
  };


  export const login = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_TOKEN":
        return { token: payload };
  
      default:
        return state;
    }
  };
   export default login;