import { useSelector } from 'react-redux';
import * as userSelectors from '../state/user/selectors';

const useProfilePicture = () => {
  const profilePicture = useSelector(userSelectors.picture);

  return {
    profilePicture,
  };
};

export default useProfilePicture;
