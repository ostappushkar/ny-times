import { actionTypes } from "./actionTypes";
const initialState = {
  isLogged: false,
  currentUser: {},
};
export const mainReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        isLogged: action.payload.isLogged,
        currentUser: action.payload.currentUser,
      };
    default:
      return {
        ...state,
      };
  }
};
