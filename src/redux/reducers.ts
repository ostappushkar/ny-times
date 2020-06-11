import { actionTypes } from "./actionTypes";
const initialState = {
  isLogged: false,
  currentUser: {},
  articles: [],
};
export const mainReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        isLogged: action.payload.isLogged,
        currentUser: action.payload.currentUser,
      };
    case actionTypes.GET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload.articles,
      };
    default:
      return {
        ...state,
      };
  }
};
