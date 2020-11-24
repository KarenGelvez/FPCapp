import {types} from '../Types';

export const loading = (state) => {
  return {
    type: types.uiLoading,
    payload: state,
  };
};

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

export const showModalRegister = (state) => {
  return {
    type: types.uiShowModalRegister,
    payload: state,
  };
};

export const showModalRP = (state) => {
  return {
    type: types.uiShowModalRegProd,
    payload: state,
  };
};

export const showModalRI = (state) => {
  return {
    type: types.uiShowModalRegIngr,
    payload: state,
  };
};

export const showModalUP = (state) => {
  return {
    type: types.uiShowModalUpdProd,
    payload: state,
  };
};

export const showModalUPI = (state) => {
  return {
    type: types.uiShowModalUpdIngr,
    payload: state,
  };
};
