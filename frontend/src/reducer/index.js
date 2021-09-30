import { createStore, combineReducers } from "redux";

import login from "./login/index";
import articles from "./article";
const reducers = combineReducers({ login1: login ,articles1:articles  });


const store = createStore(reducers);

export default store;
