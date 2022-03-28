import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as interviewActions from '../state/interviews/actions';
import * as interviewSelectors from '../state/interviews/selectors';

const useInterviews = (termQuery) => {
  const dispatch = useDispatch();
  const interviews = useSelector(interviewSelectors.interviews);

  const getInterviews = useCallback(async () => {
    try {
      const interviews = await api.interviews.getInterviews(termQuery);
      if (interviews.status !== 200) {
        throw new Error(
          `Could not fetch interviews, HTTP ${interviews.status}`,
        );
      }

      return {
        interviews: interviews.data,
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
      const { interviews } = await getInterviews();
      dispatch(interviewActions.setInterviews(interviews));
    })();
  }, [dispatch, getInterviews]);

  return {
    interviews,
  };
};

export default useInterviews;
