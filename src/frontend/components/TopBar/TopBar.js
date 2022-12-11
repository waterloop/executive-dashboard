import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MUIAppBar from '@mui/material/AppBar';
import MUIToolbar from '@mui/material/Toolbar';
import MUIIconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnstyledProfileDropdown from './ProfileDropdown';
import useGoogleAuth from '../../hooks/google-auth';

import WaterloopLogoSVG from '../../assets/svg/waterloop-logo.svg';

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
  right: 55px;
  /*required to position the profile dropdown body in front of the toolbar*/
  z-index: 1800;
`;

const IconButton = styled(MUIIconButton)`
  &:hover {
    /*needed to prevent the button from changing color on hover*/
    background-color: transparent !important;
  }
`;

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
              aria-label="menu"
              component={Link}
              to="/" // Needed to suppress MUI console complaint.
              disableRipple
            >
              <WaterloopLogo />
            </IconButton>
            <div>{mapNavDropdowns()}</div>
          </NavContainer>
          <IconButton
            aria-label="profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            disableRipple
          >
            <ProfilePicture src={profilePicture} alt="profile" />
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
