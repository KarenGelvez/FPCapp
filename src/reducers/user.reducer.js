import {types} from '../Types';

const initialState = {
  teachersList: [],
  key: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getTeachers:
      return {...state, teachersList: action.payload};
    case types.getKeyTeachers:
      return {...state, key: action.payload};
    default:
      return state;
  }
};
