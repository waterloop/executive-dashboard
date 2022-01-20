import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MUIAppBar from '@material-ui/core/AppBar';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUIIconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import WaterloopLogoSVG from '../../assets/svg/waterloop-logo.svg';
/* TODO: Implement the useProfilePicture hook so the user's PFP is shown instead of this mock image */
import MockProfilePicture from '../../assets/svg/mock-profile-picture.svg';

import NavDropdown from '../NavDropdown';

const AppBar = styled(MUIAppBar)`
  background-color: ${({ theme }) => theme.colours.white};
`;

const Toolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colours.white};
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
          path: '/applications',
        },
        {
          label: 'Interviews',
          path: '/interviews',
        },
        {
          label: 'Decisions',
          path: '/decisions',
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

  const mapNavDropdowns = () =>
    navDropdowns.map((dropdown) => <NavDropdown dropdown={dropdown} />);

  return (
    <AppBar position="relative">
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
          disableRipple
        >
          <ProfilePicture src={MockProfilePicture} alt="profile" />
          <KeyboardArrowDownIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
