import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../api';
import * as teamsActions from '../state/teams/actions';
import * as teamsSelectors from '../state/teams/selectors';
import { renameObjectKeys } from '../utils';

const useTeams = () => {
  const dispatch = useDispatch();
  const teams = useSelector(teamsSelectors.teams);
  const teamDesc = useSelector(teamsSelectors.teamDesc);

  const getTeams = useCallback(async () => {
    try {
      const teams = await api.teams.getTeams();
      const teamDesc = await api.teams.getTeamDesc();
      const teamsData = renameObjectKeys(teams.data, 'teamName', 'name');

      return {
        teams: teamsData,
        teamDesc: teamDesc.data,
      };
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
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
