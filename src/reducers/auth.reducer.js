import {types} from '../Types';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.logout:
      return {};

    default:
      return state;
  }
};
