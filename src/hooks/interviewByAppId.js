import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as interviewActions from '../state/interviews/actions';
import * as interviewSelectors from '../state/interviews/selectors';

// TODO: Determine whether or not the interviewById logic can be moved to a local hook instead
// in conjunction with the addOrUpdateInterview logic.
const useInterviewByAppId = (id) => {
  const dispatch = useDispatch();
  const interviews = useSelector(interviewSelectors.interviews);

  const getInterviewById = useCallback(async () => {
    try {
      const interview = await api.interviews.getInterviewByAppId(id);
      if (interview.status !== 200) {
        throw new Error(
          `Could not fetch interview with ID ${id}, HTTP ${interviews.status}`,
        );
      }
      const { data } = interview;
      return {
        id: data.id,
        interview: data,
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
      const { id, interview } = await getInterviewById();
      dispatch(interviewActions.setInterviewById(id, interview));
    })();
  }, [dispatch, getInterviewById]);

  return {
    interviews,
  };
};

export default useInterviewByAppId;
