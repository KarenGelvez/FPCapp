import {types} from '../Types';

export const changeUser = (state) => {
  return {
    type: types.uiLoginTeacher,
    payload: state,
  };
};

export const changeMethodGoogle = (state) => {
  return {
    type: types.uiRegisterGoogle,
    payload: state,
  };
};

export const changeLoadingSS = (state) => {
  return {
    type: types.uiLoadingSplashScreen,
    payload: state,
  };
};
