import {ActionSheetIOS} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './reducers/auth.reducer';
import {teacherReducer} from './reducers/teacher.reducer';
import {uiReducer} from './reducers/ui.reducer';

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  teacher: teacherReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
