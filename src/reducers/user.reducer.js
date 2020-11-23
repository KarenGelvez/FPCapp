import {types} from '../Types';

const initialState = {
  teachersList: [],
  studentsList: [],
  studentsVerifiedList: [],
  key: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getTeachers:
      return {
        ...state,
        teachersList: action.payload,
      };
    case types.getStudents:
      return {
        ...state,
        studentsList: action.payload,
      };
    case types.getStudentsVerified:
      return {
        ...state,
        studentsVerifiedList: action.payload,
      };
    case types.getKeyTeachers:
      return {
        ...state,
        key: action.payload,
      };
    default:
      return state;
  }
};
