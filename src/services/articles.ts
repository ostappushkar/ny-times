import Store from "../redux/store";
import action from "../redux/actions";
import actionTypes from "../redux/article/actionTypes";
import Http from "./http";
import { IArticle } from "../App";

export const getArticles = () => {
  Store.dispatch(action(actionTypes.ARTICLE_LOADING));
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
      Store.dispatch(
        action(actionTypes.ARTICLE_LOADED, { articles: articles })
      );
    })
    .catch((e) => {
      console.warn(e);
    });
};
