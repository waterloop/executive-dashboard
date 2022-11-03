import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import * as userSelectors from '../state/user/selectors';

const useProfileData = () => {
  let profileData = useSelector(userSelectors.profile);
  if (!profileData) {
    const name = Cookies.get('userName');
    const email = Cookies.get('userEmail');
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
