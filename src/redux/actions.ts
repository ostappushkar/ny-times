import { actionTypes } from "./actionTypes";
import { IArticle } from "../App";
export const getUser = (isLogged: boolean, currentUser: firebase.User) => {
  return {
    type: actionTypes.GET_USER,
    payload: { isLogged: isLogged, currentUser: currentUser },
  };
};
export const getArticlesSuccess = (articles: Array<IArticle>) => {
  return {
    type: actionTypes.GET_ARTICLES_SUCCESS,
    payload: { articles: articles },
  };
};
export const getArticlesStarted = () => {
  return {
    type: actionTypes.GET_ARTICLES_STARTED,
  };
};
