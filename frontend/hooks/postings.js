import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import api from '../api';
import * as postingActions from '../state/postings/actions';
import * as postingSelectors from '../state/postings/selectors';

const dateStringsToDate = (data) => ({
  ...data,
  deadline: new Date(data.deadline),
  lastUpdated: new Date(data.lastUpdated),
});

const dateStringsToDates = R.map(dateStringsToDate);
const usePostings = () => {
  const dispatch = useDispatch();
  const postings = useSelector(postingSelectors.postings);
  const getPostings = useCallback(async () => {
    try {
      const joinTeamName = true;
      const response = await api.postings.getPostings(joinTeamName);
      if (joinTeamName) {
        return dateStringsToDates(
          response.data.map((item) => ({
            ...item,
            team: item.teamName,
            teamName: undefined,
          })),
        );
      }
      const teams = await api.teams.getTeams();
      return dateStringsToDates(
        response.data.map((item) => ({
          ...item,
          team: teams.data.find((team) => team.id === item.teamId).teamName,
        })),
      );
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      throw err;
    }
  }, []);

  const load = useCallback(async () => {
    try {
      dispatch(postingActions.setPostings(await getPostings()));
      // eslint-disable-next-line no-console
      console.log('posting load success');
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to load postings');
      }
    }
  }, [dispatch, getPostings]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    postings,
  };
};

export default usePostings;
