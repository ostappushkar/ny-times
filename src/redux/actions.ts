import { actionTypes } from "./actionTypes";
export const getUser = (isLogged: boolean, currentUser: any) => {
  return {
    type: actionTypes.GET_USER,
    payload: { isLogged: isLogged, currentUser: currentUser },
  };
};
