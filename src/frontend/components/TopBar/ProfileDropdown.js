import React from 'react';
import styled from 'styled-components';
import MUIGrid from '@mui/material/Grid';
import MUITypography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Typography = styled(MUITypography)`
  font: ${({ theme }) => theme.fonts.bold14};
  text-align: center;
  cursor: pointer;
`;

const Grid = styled(MUIGrid)``;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-bottom: 16px solid ${({ theme }) => theme.colours.greys.grey1};
`;

const MainBox = styled(Grid).attrs({ container: true })`
  background-color: ${({ theme }) => theme.colours.greys.grey1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  border-radius: 15px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  text-align: center;
`;
const Container = styled.div`
  ${Arrow} {
    position: absolute;
    top: -11px;
    right: 10px;
  }
`;

const ProfileDropdown = ({ className, onClose, onLogout }) => (
  <ClickAwayListener onClickAway={onClose}>
    <Container className={className}>
      <Arrow />
      <MainBox>
        <Typography onClick={onLogout}>Sign Out</Typography>
      </MainBox>
    </Container>
  </ClickAwayListener>
);

export default ProfileDropdown;
