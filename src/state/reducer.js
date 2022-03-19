import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import applicationsReducer from './applications/reducer';
import postingsReducer from './postings/reducer';
import teamsReducer from './teams/reducer';

export default combineReducers({
  user: userReducer,
  applications: applicationsReducer,
  postings: postingsReducer,
  teams: teamsReducer,
});
