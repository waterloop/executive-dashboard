import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MUIAppBar from '@material-ui/core/AppBar';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUIIconButton from '@material-ui/core/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import WaterloopLogoSVG from './assets/topbar-logo.svg';
import UnstyledDesktopMenu from './DesktopMenu';
import MockProfilePicture from './assets/mock-profile-picture.svg';
// import useProfilePicture from '../../hooks/profile-picture';

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

const DesktopMenu = styled(UnstyledDesktopMenu)`
  position: absolute;
  top: 60px;
  left: 80px;
  z-index: 1800;
`;

const ProfilePicture = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const { profilePicture } = useProfilePicture();

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <div>
            <IconButton style={{ backgroundColor: 'transparent' }} aria-label="menu" component={Link} to="/">
              <WaterloopLogo />
            </IconButton>
            <IconButton
              aria-label="menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <AppsIcon fontSize="large" />
            </IconButton>
          </div>
          <IconButton style={{ backgroundColor: 'transparent' }} aria-label="profile">
            <ProfilePicture src={MockProfilePicture} alt="profile" />
            <KeyboardArrowDownIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {menuOpen && <DesktopMenu onClose={() => setMenuOpen(false)} />}
    </div>
  );
};

export default TopBar;
