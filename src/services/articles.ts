import Store from "../redux/store";
import { getArticlesStarted, getArticlesSuccess } from "../redux/actions";
import Http from "./http";

export const getArticles = () => {
  Store.dispatch(getArticlesStarted());
  Http.get("/svc/topstories/v2/home.json")
    .then((response: any) => {
      let articles = [];
      response.results.map((item: any) => {
        return articles.push({
          title: item.title,
          abstract: item.abstract,
          byline: item.byline,
          tags: item.des_facet,
          image: item.multimedia[0].url,
        });
      });
      Store.dispatch(getArticlesSuccess(articles));
    })
    .catch((e) => {
      console.warn(e);
    });
};
