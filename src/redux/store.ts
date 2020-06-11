import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import login, { ILoginState } from "./user";
import article, { IArticleState } from "./article";
export interface IStoreState {
  login: ILoginState;
  article: IArticleState;
}
let middleware = compose(applyMiddleware(thunk, logger));
const Store = createStore(combineReducers({ login, article }), middleware);

export default Store;
