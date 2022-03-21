import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../api';
import * as teamsActions from '../state/teams/actions';
import * as teamsSelectors from '../state/teams/selectors';

const useTeams = () => {
  const dispatch = useDispatch();
  const teams = useSelector(teamsSelectors.teams);
  const teamDesc = useSelector(teamsSelectors.teamDesc);

  const getTeams = useCallback(async () => {
    try {
      const teams = await api.teams.getTeams();
      const teamDesc = await api.teams.getTeamDesc();

      return {
        teams: teams.data,
        teamDesc: teamDesc.data,
      };
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }
      return {};
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { teams, teamDesc } = await getTeams();
      dispatch(teamsActions.setTeams(teams));
      dispatch(teamsActions.setTeamDesc(teamDesc));
    })();
  }, [dispatch, getTeams]);

  return {
    teams,
    teamDesc,
  };
};

export default useTeams;
