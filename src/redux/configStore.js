import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import bucket from "./modules/dictionary";
import { composeWithDevTools } from "redux-devtools-extension";
const middlewares = [thunk];
const rootReducer = combineReducers({ bucket });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, composeWithDevTools(enhancer));

export default store;
