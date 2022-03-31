// NOTE: This entire file is currently unused.

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as postingActions from '../state/postings/actions';
import * as postingSelectors from '../state/postings/selectors';

const dateStringsToDate = (data) => ({
  ...data,
  deadline: new Date(data.deadline),
  lastUpdated: new Date(data.lastUpdated),
});

const usePostingById = (postingId) => {
  const dispatch = useDispatch();
  const posting = useSelector(postingSelectors.postingById(postingId));
  const getPostingById = useCallback(async () => {
    try {
      const response = await api.postings.getPostingById(postingId);
      return dateStringsToDate(response.data);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(err);
      }
      throw err;
    }
  }, [postingId]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(
          postingActions.setPostingById(postingId, await getPostingById()),
        );
      } catch (err) {
        // TODO setup a snackbar to handle errors
      }
    })();
  }, [dispatch, getPostingById, postingId]);

  return {
    posting,
  };
};

export default usePostingById;
