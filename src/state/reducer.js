import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import applicationsReducer from './applications/reducer';

export default combineReducers({
  user: userReducer,
  applications: applicationsReducer,
});
