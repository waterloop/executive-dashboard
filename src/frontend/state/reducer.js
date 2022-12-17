import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import applicationsReducer from './applications/reducer';
import interviewsReducer from './interviews/reducer';
import postingsReducer from './postings/reducer';
import teamsReducer from './teams/reducer';
import emailReducer from './email/reducer';
import configurationReducer from './configuration/reducer';

export default combineReducers({
  user: userReducer,
  applications: applicationsReducer,
  interviews: interviewsReducer,
  postings: postingsReducer,
  teams: teamsReducer,
  email: emailReducer,
  configuration: configurationReducer,
});
