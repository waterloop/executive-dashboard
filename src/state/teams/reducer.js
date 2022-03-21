import * as actionTypes from '../actionTypes';

const initialState = {
  allTeams: [],
  allTeamDesc: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TEAMS_SET_TEAMS:
      return {
        ...state,
        allTeams: payload.teams,
      };

    case actionTypes.TEAMS_SET_TEAM_DESC:
      return {
        ...state,
        allTeamDesc: payload.teamDesc,
      };

    default:
      return { ...state };
  }
};
