import action from "../actions";
import actionTypes from "./actionTypes";
import Http from "../../services/http";
import { IArticle } from "../../App";

export const getArticles = () => (dispatch) => {
  dispatch(action(actionTypes.ARTICLE_LOADING));
  Http.get("/svc/topstories/v2/home.json")
    .then((response: any) => {
      let articles: Array<IArticle> = [];
      response.results.map((item: any) => {
        return articles.push({
          title: item.title,
          abstract: item.abstract,
          byline: item.byline,
          tags: item.des_facet,
          image: item.multimedia[0].url,
        });
      });
      dispatch(action(actionTypes.ARTICLE_LOADED, { articles: articles }));
    })
    .catch((e) => {
      console.warn(e);
    });
};

export const setArticle = (article: IArticle) => (dispatch) => {
  dispatch(action(actionTypes.SET_ARTICLE, { article: article }));
};
export const clearArticle = () => (dispatch) => {
  dispatch(action(actionTypes.CLEAR_ARTICLE));
};
