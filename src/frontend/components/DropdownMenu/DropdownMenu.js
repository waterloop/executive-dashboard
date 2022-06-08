/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Tooltip } from '@mui/material';

import chevron from '../../assets/svg/recruitment/chevron.svg';

const Chevron = styled.img`
  src: ${chevron};
  position: relative;
  left: 1rem;
  top: 0.1rem;
`;

const Error = styled.p`
  font: ${({ theme }) => theme.fonts.medium14};
  color: ${({ theme }) => theme.colours.reds.red1};
`;

/**
 * Dropdown selector.
 *
 * @param current - current selected element's key.
 * @param options - a JSON key-string mapping of options
 * @param backgrounds - JSON key-string mapping of background color options.
 * @param setCurrent - callback function to change status value.
 * @param locked -  boolean indicating whether to prevent changing statuses or not.
 * @param errorMessage - optional string error message to display when someone clicks a locked menu
 */
const DropdownMenu = ({
  current,
  options,
  backgrounds,
  setCurrent,
  locked,
  errorMessage = 'This menu is locked!',
  emailSent,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [errorText, setErrorText] = useState('');

  const handleClickListItem = (event) => {
    if (locked) {
      setErrorText(errorMessage);
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (key) => {
    setCurrent(key);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="dropdown"
        sx={{
          backgroundColor: backgrounds[current],
          width: 'max-content',
          borderRadius: '30px',
          height: '20px',
          padding: '0.5rem 1.25rem',
          display: 'flex',
        }}
      >
        <Tooltip title={emailSent ? 'Email has already been sent' : ''}>
          <ListItem
            button
            id="button"
            aria-haspopup="listbox"
            aria-controls="menu"
            aria-label="dropdown-item"
            aria-expanded={open ? 'true' : undefined}
            onClick={emailSent ? () => {} : handleClickListItem}
            sx={{
              right: '0.2rem',
              ...(emailSent && {
                cursor: 'not-allowed',
                '&:hover': { backgroundColor: 'transparent' },
                opacity: 0.5,
              }),
            }}
            disableTouchRipple={emailSent ? true : false}
          >
            <ListItemText primary={options[current]} />
            <Chevron src={chevron} alt="chevron" />
          </ListItem>
        </Tooltip>
      </List>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'button',
          role: 'listbox',
        }}
      >
        {Object.keys(options).map((key) => (
          <MenuItem
            key={key}
            selected={current === key}
            onClick={() => handleMenuItemClick(key)}
          >
            {options[key]}
          </MenuItem>
        ))}
      </Menu>
      {errorText && <Error>{errorText}</Error>}
    </div>
  );
};

export default DropdownMenu;
