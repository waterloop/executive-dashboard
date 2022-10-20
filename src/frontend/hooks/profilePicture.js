import { useSelector } from 'react-redux';
import * as userSelectors from '../state/user/selectors';
import CookiesHelper from './cookies';

const useProfilePicture = () => {
  let profilePicture = useSelector(userSelectors.picture);
  const {getCookie} = CookiesHelper
  if (profilePicture === '') {
    profilePicture = getCookie('profilePicture');
  }

  return {
    profilePicture,
  };
};

export default useProfilePicture;
