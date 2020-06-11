import actionTypes from "./actionTypes";

export interface ILoginState {
  isLogged: boolean;
  currentUser: firebase.User;
}
const loginState: ILoginState = {
  isLogged: false,
  currentUser: null,
};

interface IDispathAction {
  type: string;
  payload: {
    data: any;
    error: any;
  };
}
const loginReducer = (
  state = loginState,
  action: IDispathAction
): ILoginState => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        isLogged: action.payload.data.isLogged,
        currentUser: action.payload.data.currentUser,
      };
    default:
      return {
        ...state,
      };
  }
};
export default loginReducer;
