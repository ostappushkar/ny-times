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
  currentArticle: IArticle;
}
const articleState: IArticleState = {
  loading: false,
  articles: [],
  currentArticle: null,
};

const articleReducer = (
  state = articleState,
  action: IDispathAction
): IArticleState => {
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
    case actionTypes.SET_ARTICLE:
      return {
        ...state,
        currentArticle: action.payload.data.article,
      };
    case actionTypes.CLEAR_ARTICLE:
      return {
        ...state,
        currentArticle: null,
      };
    default:
      return {
        ...state,
      };
  }
};
export default articleReducer;
