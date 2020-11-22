import {types} from '../Types';

const initialState = {
  teachersList: [],
};

export const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getTeachers:
      return {...state, teachersList: action.payload};

    default:
      return state;
  }
};
