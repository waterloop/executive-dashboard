import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as applicationActions from '../state/applications/actions';
import * as applicationSelectors from '../state/applications/selectors';

// TODO: If we need appStatuses separately from useApplications, then move appStatuses to separate hook.
// For now, if termQuery is undefined, then we can just get the application statuses.
const useApplications = (termQuery) => {
  const dispatch = useDispatch();
  const applications = useSelector(applicationSelectors.applications);
  const appStatuses = useSelector(applicationSelectors.appStatuses);

  const getApplications = useCallback(async () => {
    try {
      let applications = [];
      if (termQuery) {
        applications = await api.applications.getApplications(termQuery);
        if (applications.status !== 200) {
          throw new Error(
            `Could not fetch applications, HTTP ${applications.status}`,
          );
        }
      }

      const appStatuses = await api.applications.getApplicationStatuses();
      if (appStatuses.status !== 200) {
        throw new Error(
          `Could not fetch application statuses, HTTP ${applications.status}`,
        );
      }
      return {
        applications: applications.data,
        appStatuses: appStatuses.data,
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
      const { applications, appStatuses } = await getApplications();
      dispatch(applicationActions.setApplications(applications));
      dispatch(applicationActions.setApplicationStatuses(appStatuses));
    })();
  }, [dispatch, getApplications]);

  return {
    applications,
    appStatuses,
  };
};

export default useApplications;
