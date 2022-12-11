import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as emailActions from '../state/email/actions';
import * as applicationActions from '../state/applications/actions';
import * as emailSelectors from '../state/email/selectors';
import CookiesHelper from './cookies.js';

const useEmail = () => {
  const dispatch = useDispatch();
  const emailData = useSelector(emailSelectors.emailData);

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
        dispatch(emailActions.setEmailData(res.data));
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
    emailData,
    updateEmailStatus,
  };
};

export default useEmail;
