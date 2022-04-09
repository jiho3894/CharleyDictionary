import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import bucket from "./modules/dictionary";

const middlewares = [thunk];
const rootReducer = combineReducers({ bucket });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
