import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './reducers/auth.reducer';
import {dataReducer} from './reducers/data.reducer';
import {uiReducer} from './reducers/ui.reducer';
import {userReducer} from './reducers/user.reducer';

const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  user: userReducer,
  data: dataReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
