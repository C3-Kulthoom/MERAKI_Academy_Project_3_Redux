import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

//context providers
import AuthProvider from "./context/auth";

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
