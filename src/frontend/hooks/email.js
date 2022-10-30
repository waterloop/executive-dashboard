import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as emailActions from '../state/email/actions';
import * as emailSelectors from '../state/email/selectors';

const useEmail = () => {
  const dispatch = useDispatch();
  const emailData = useSelector(emailSelectors.emailData);

  const updateEmailSent = useCallback(
    async (emailData) => {
      try {
        const res = await api.email.updateApplicationEmailSent(emailData);
        if (res.status !== 200) {
          throw new Error(
            `Could not update email sent status, HTTP ${res.status}`,
          );
        }
        dispatch(emailActions.setEmailData(res.data));
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
    updateEmailSent,
  };
};

export default useEmail;
