import {types} from '../Types';

const initialState = {
  userData: {},
  teacher: null,
  userToRegister: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.userActive:
      return {
        ...state,
        userData: action.payload,
      };
    case types.removeUser:
      return {
        ...state,
        userData: null,
      };
    case types.userToRegister:
      return {
        ...state,
        userToRegister: action.payload,
      };

    default:
      return state;
  }
};
