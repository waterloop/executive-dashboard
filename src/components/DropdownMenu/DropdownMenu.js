import React, { useState } from 'react';
import styled from 'styled-components';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import theme from '../../theme';
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

// initialStatus is a string of the initial element to display
// options is an array of strings representing each option to display in the menu
// backgrounds is an optional array of colours that map to each option
// callback is a function to handle backend data changes
// locked is a boolean indicating whether to prevent changing statuses or not
// errorMessage is an optional string error message to display when someone clicks a locked menu
const DropdownMenu = ({
  initialStatus,
  options,
  backgrounds = new Array(options.length).fill(theme.colours.yellows.yellow1),
  locked,
  errorMessage = 'This menu is locked!',
  // callback,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(
    options.indexOf(initialStatus) !== -1 ? options.indexOf(initialStatus) : 0,
  );
  const open = Boolean(anchorEl);
  const [errorText, setErrorText] = useState('');

  const handleClickListItem = (event) => {
    if (locked) {
      setErrorText(errorMessage);
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    // callback(options[selectedIndex]);
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
          backgroundColor: backgrounds[selectedIndex],
          width: 'max-content',
          borderRadius: '30px',
          height: '20px',
          padding: '0.5rem 1.25rem',
          display: 'flex',
        }}
      >
        <ListItem
          button
          id="button"
          aria-haspopup="listbox"
          aria-controls="menu"
          aria-label="dropdown-item"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          sx={{ right: '0.2rem' }}
        >
          <ListItemText primary={options[selectedIndex]} />
          <Chevron src={chevron} alt="chevron" />
        </ListItem>
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
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {errorText && <Error>{errorText}</Error>}
    </div>
  );
};

export default DropdownMenu;
