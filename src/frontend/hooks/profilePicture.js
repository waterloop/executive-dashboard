import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import * as userSelectors from '../state/user/selectors';

const useProfilePicture = () => {
  let profilePicture = useSelector(userSelectors.picture);
  if (!profilePicture) {
    profilePicture = Cookies.get('profilePicture');
  }

  return {
    profilePicture,
  };
};

export default useProfilePicture;
