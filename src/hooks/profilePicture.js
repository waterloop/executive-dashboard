import { useSelector } from 'react-redux';
import * as userSelectors from '../state/user/selectors';

/* TODO: Complete this hook to be functional */

const useProfilePicture = () => {
  const profilePicture = useSelector(userSelectors.picture);

  return {
    profilePicture,
  };
};

export default useProfilePicture;
