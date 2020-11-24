import {types} from '../Types';

const initialState = {
  userTeacher: false,
  methodRegisterGoogle: false,
  loadingSS: true,
  showModalRegister: false,
  showModalRegProd: false,
  showModalUpdProd: false,
  showModalRegIngr: false,
  showModalUpdIngr: false,
  loading: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiLoginTeacher:
      return {
        ...state,
        userTeacher: action.payload,
      };
    case types.uiLoadingSplashScreen:
      return {
        ...state,
        loadingSS: action.payload,
      };
    case types.uiShowModalRegister:
      return {
        ...state,
        showModalRegister: action.payload,
      };
    case types.uiLoading:
      return {
        ...state,
        loading: action.payload,
      };
    case types.uiShowModalRegProd:
      return {
        ...state,
        showModalRegProd: action.payload,
      };
    case types.uiShowModalRegIngr:
      return {
        ...state,
        showModalRegIngr: action.payload,
      };
    case types.uiShowModalUpdProd:
      return {
        ...state,
        showModalUpdProd: action.payload,
      };
    case types.uiShowModalUpdIngr:
      return {
        ...state,
        showModalUpdIngr: action.payload,
      };
    default:
      return state;
  }
};
