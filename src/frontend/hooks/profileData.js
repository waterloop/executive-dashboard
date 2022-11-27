import { useSelector } from 'react-redux';
import * as userSelectors from '../state/user/selectors';
import CookiesHelper from './cookies';

const useProfileData = () => {
  const {getCookie,  CookieTags} = CookiesHelper;
  let profileData = useSelector(userSelectors.profile);
  if (profileData === null) {
    const name = getCookie(CookieTags.userName);
    const email = getCookie(CookieTags.userEmail);
    profileData = {
      name,
      email,
    };
  }

  return {
    profileData,
  };
};

export default useProfileData;
