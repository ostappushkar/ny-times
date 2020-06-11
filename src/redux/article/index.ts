import { IArticle } from "../../App";
import actionTypes from "./actionTypes";
interface IDispathAction {
  type: string;
  payload: {
    data: any;
    error: any;
  };
}
export interface IArticleState {
  loading: boolean;
  articles: Array<IArticle>;
}
const articleState: IArticleState = {
  loading: false,
  articles: [],
};

const articleReducer = (state = articleState, action: IDispathAction) => {
  switch (action.type) {
    case actionTypes.ARTICLE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ARTICLE_LOADED:
      return {
        ...state,
        loading: false,
        articles: action.payload.data.articles,
      };
    default:
      return {
        ...state,
      };
  }
};
export default articleReducer;
