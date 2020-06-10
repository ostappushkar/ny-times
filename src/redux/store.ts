import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { mainReducer } from "./reducers";

let middleware = compose(applyMiddleware(thunk, logger));
const Store = createStore(mainReducer, middleware);

export default Store;
