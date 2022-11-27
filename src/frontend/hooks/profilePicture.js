import { useSelector } from 'react-redux';
import * as userSelectors from '../state/user/selectors';
import CookiesHelper from './cookies';

const useProfilePicture = () => {
  let profilePicture = useSelector(userSelectors.picture);
  const {getCookie, CookieTags} = CookiesHelper
  if (profilePicture === '') {
    profilePicture = getCookie(CookieTags.profilePicture);
  }

  return {
    profilePicture,
  };
};

export default useProfilePicture;
