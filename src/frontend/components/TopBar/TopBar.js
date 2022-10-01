import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MUIAppBar from '@material-ui/core/AppBar';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUIIconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnstyledProfileDropdown from './ProfileDropdown';
import useGoogleAuth from '../../hooks/google-auth';

import WaterloopLogoSVG from '../../assets/svg/waterloop-logo.svg';
/* TODO: Implement the useProfilePicture hook so the user's PFP is shown instead of this mock image */

import NavDropdown from '../NavDropdown';
import useProfilePicture from '../../hooks/profilePicture';

const AppBar = styled(MUIAppBar)`
  background-color: ${({ theme }) => theme.colours.white};
`;

const Toolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colours.white};
`;

const ProfileDropdown = styled(UnstyledProfileDropdown)`
  position: absolute;
  top: 60px;
  right: 62px;
  z-index: 1800;
`;

const IconButton = styled(MUIIconButton)``;

const WaterloopLogo = styled.img.attrs({
  src: WaterloopLogoSVG,
})``;

const ProfilePicture = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

const NavContainer = styled.div`
  display: flex;
  width: 800px;
`;

const TopBar = () => {
  const navDropdowns = [
    {
      section: 'Recruitment',
      rootPath: '/recruitment',
      options: [
        {
          label: 'Applications',
          path: '/application',
        },
        {
          label: 'Interviews',
          path: '/interview',
        },
        {
          label: 'Decisions',
          path: '/decision',
        },
        {
          label: 'Configuration',
          path: '/config',
        },
      ],
    },
    {
      section: 'Analytics',
      rootPath: '/analytics',
      options: [
        {
          label: 'Website',
          path: '/website',
        },
      ],
    },
  ];

  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { signOut } = useGoogleAuth();
  const { profilePicture } = useProfilePicture();
  const mapNavDropdowns = () =>
    navDropdowns.map((dropdown) => (
      <NavDropdown key={dropdown.section} dropdown={dropdown} />
    ));

  const onLogout = () => {
    signOut();
    history.push('/sign-in');
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <NavContainer>
            <IconButton
              style={{ backgroundColor: 'transparent' }}
              aria-label="menu"
              component={Link}
              to="/"
              disableRipple
            >
              <WaterloopLogo />
            </IconButton>
            <div>{mapNavDropdowns()}</div>
          </NavContainer>
          <IconButton
            style={{ backgroundColor: 'transparent' }}
            aria-label="profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            disableRipple
          >
            <ProfilePicture src={profilePicture} alt="profile"/>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {dropdownOpen && (
        <ProfileDropdown
          onClose={() => setDropdownOpen(false)}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

export default TopBar;
