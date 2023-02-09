import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as applicationActions from '../state/applications/actions';
import * as applicationSelectors from '../state/applications/selectors';
import useGoogleAuth from './google-auth';
import { useHistory } from 'react-router-dom';

const useApplications = (termQuery) => {
  const dispatch = useDispatch();
  const applications = useSelector(applicationSelectors.applications);
  const appsByEmail = useSelector(applicationSelectors.applicationsByEmail);
  const appStatuses = useSelector(applicationSelectors.appStatuses);
  // eslint-disable-next-line no-unused-vars
  const { signOut } = useGoogleAuth();
  const history = useHistory();

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
        // eslint-disable-next-line no-console
        console.error(err);
      }
      signOut();
      history.push('/sign-in');
    }
  }, [termQuery]);

  // TODO: Return only entries for the email being used, instead of all apps by email, at least for this hook.
  const getApplicationsByEmail = useCallback(
    async (email) => {
      try {
        const applications = await api.applications.getApplicationsByEmail(
          email,
        );
        if (applications.status !== 200) {
          throw new Error(
            `Could not fetch applications for email ${email}, HTTP ${applications.status}`,
          );
        }
        dispatch(
          applicationActions.setApplicationsByEmail(email, applications.data),
        );
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    },
    [dispatch],
  );

  const updateAppStatus = useCallback(
    async (appID, newStatus) => {
      try {
        const res = await api.applications.updateApplicationStatus(
          appID,
          newStatus,
        );
        if (res.status !== 200) {
          throw new Error(
            `Could not update application status, HTTP ${res.status}`,
          );
        }
        dispatch(applicationActions.updateAppStatus(res.data));
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
      const { applications, appStatuses } = await getApplications();
      dispatch(applicationActions.setApplications(applications));
      dispatch(applicationActions.setApplicationStatuses(appStatuses));
    })();
  }, [dispatch, getApplications]);

  return {
    applications,
    appsByEmail,
    getApplicationsByEmail, // TODO: split appByEmail and Apps hooks to separate files.
    appStatuses,
    updateAppStatus,
  };
};

export default useApplications;
