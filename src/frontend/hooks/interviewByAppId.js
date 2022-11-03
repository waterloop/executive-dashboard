import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as interviewActions from '../state/interviews/actions';
import * as interviewSelectors from '../state/interviews/selectors';

const useInterviewByAppId = (id) => {
  const dispatch = useDispatch();
  const interviewById = useSelector(interviewSelectors.interviewById);

  const getInterviewById = useCallback(async () => {
    try {
      const interview = await api.interviews.getInterviewByAppId(id);

      if (interview.status !== 200) {
        // May not be an error since interview entry doesn't yet exist:
        // eslint-disable-next-line no-console
        console.warn(
          `Could not fetch interview with ID ${id}, HTTP ${interview.status}`,
        );
        return {};
      }
      const { data } = interview;
      return {
        interview: data,
      };
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(err);
      }
      return {};
    }
  }, [id]);

  const updateInterviewNote = useCallback(
    async (appID, note) => {
      try {
        const res = await api.interviews.updateOrAddInterview(appID, note);

        if (res.status !== 200) {
          throw new Error(
            `Could not update interview notes, HTTP ${res.status}`,
          );
        }
        dispatch(interviewActions.updateInterviewNote(res));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    (async () => {
      const { interview } = await getInterviewById();
      if (!interview) return;
      dispatch(interviewActions.setInterviewById(interview));
    })();
  }, [dispatch, getInterviewById]);

  const interview = interviewById[id];
  return {
    interview,
    updateInterviewNote,
  };
};

export default useInterviewByAppId;
