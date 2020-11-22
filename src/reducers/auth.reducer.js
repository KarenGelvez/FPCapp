import {types} from '../Types';

const initialState = {
  userData: null,
  teacher: null,
  userToRegister: null,
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
    case types.logout:
      return {};

    default:
      return state;
  }
};
