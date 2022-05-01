import * as actionTypes from '../actionTypes';

export const setTeams = (teams) => ({
  type: actionTypes.TEAMS_SET_TEAMS,
  payload: {
    teams,
  },
});

export const setTeamDesc = (teamDesc) => ({
  type: actionTypes.TEAMS_SET_TEAM_DESC,
  payload: {
    teamDesc,
  },
});
