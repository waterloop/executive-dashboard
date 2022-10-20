import { useSelector } from 'react-redux';
import * as userSelectors from '../state/user/selectors';
import CookiesHelper from './cookies';

const useProfileData = () => {
  const {setCookie} = CookiesHelper;
  let profileData = useSelector(userSelectors.profile);
  if (profileData === null) {
    const name = setCookie('userName');
    const email = setCookie('userEmail');
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
