import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as applicationActions from '../state/applications/actions';
import * as applicationSelectors from '../state/applications/selectors';

const useApplications = (termQuery) => {
  const dispatch = useDispatch();
  const applications = useSelector(applicationSelectors.applications);

  const getApplications = useCallback(async () => {
    try {
      const applications = await api.applications.getApplications(termQuery);
      if (applications.status !== 200) {
        throw new Error(
          `Could not fetch applications, HTTP ${applications.status}`,
        );
      }
      const appData = applications.data;
      return {
        applications: appData,
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
      const { applications } = await getApplications();
      dispatch(applicationActions.setApplications(applications));
    })();
  }, [dispatch, getApplications]);

  return {
    applications,
  };
};

export default useApplications;
