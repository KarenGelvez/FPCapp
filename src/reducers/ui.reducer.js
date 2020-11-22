import {types} from '../Types';

const initialState = {
  userTeacher: false,
  methodRegisterGoogle: false,
  loadingSS: true,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiLoginTeacher:
      return {
        ...state,
        userTeacher: action.payload,
      };
    case types.uiRegisterGoogle:
      return {
        ...state,
        methodRegisterGoogle: action.payload,
      };
    case types.uiLoadingSplashScreen:
      return {
        ...state,
        loadingSS: action.payload,
      };

    default:
      return state;
  }
};
