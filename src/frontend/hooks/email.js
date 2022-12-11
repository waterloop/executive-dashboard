import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import api from 'frontend/api';
import * as applicationActions from 'frontend/state/applications/actions';
import CookiesHelper from './cookies.js';

const useEmail = () => {
  const dispatch = useDispatch();

  const updateEmailStatus = useCallback(
    async (emailData) => {
      try {
        const { getCookie, CookieTags } = CookiesHelper;
        const accessToken = getCookie(CookieTags.accessToken);
        const res = await api.email.updateApplicationEmailSent({
          ...emailData,
          accessToken,
        });
        console.log('result is: ');
        console.log(res.data);
        if (res.status !== 200) {
          throw new Error(
            `Could not update email sent status, HTTP ${res.status}`,
          );
        }
        dispatch(applicationActions.updateApplication(res.data));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    },
    [dispatch],
  );

  return {
    updateEmailStatus,
  };
};

export default useEmail;
