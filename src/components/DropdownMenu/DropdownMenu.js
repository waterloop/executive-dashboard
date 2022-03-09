import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import theme from '../../theme';

const options = [
  'Pending',
  'Rejected',
  'Undecided',
  'Interview Set Up',
  'Accepted',
];

const backgrounds = [
  theme.colours.yellows.yellow1,
  theme.colours.reds.red1,
  theme.colours.greys.grey2,
  theme.colours.blues.blue2,
  theme.colours.greens.green2,
];

export default function SimpleListMenu({ initialStatus }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(
    options.indexOf(initialStatus) !== -1 ? options.indexOf(initialStatus) : 0,
  );
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
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
        sx={{ backgroundColor: backgrounds[selectedIndex] }}
      >
        <ListItem
          button
          id="button"
          aria-haspopup="listbox"
          aria-controls="menu"
          aria-label="dropdown-item"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText primary={options[selectedIndex]} />
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
    </div>
  );
}
