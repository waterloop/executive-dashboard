import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MUIInputLabel from '@mui/material/InputLabel';
import MUIMenuItem from '@mui/material/MenuItem';
import MUIFormControl from '@mui/material/FormControl';
import MUISelect from '@mui/material/Select';

const FormControl = styled(MUIFormControl)`
  margin-left: 20px;
  margin-right: 20px;
  min-width: 100px;
`;

/* TODO: Fix the styling for this component - currently broken, make finishing touches */

const NavDropdown = ({ dropdown }) => {
  const history = useHistory();

  const handleChange = (event) => {
    history.push(dropdown.rootPath.concat(event.target.value));
  };

  const mapRoutes = () =>
    dropdown.options.map((route) => (
      <MUIMenuItem value={route.path}>{route.label}</MUIMenuItem>
    ));

  return (
    <FormControl variant="standard">
      <MUIInputLabel id="demo-simple-select-label">
        {dropdown.section}
      </MUIInputLabel>
      <MUISelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={dropdown.section}
        onChange={handleChange}
      >
        {mapRoutes()}
      </MUISelect>
    </FormControl>
  );
};

export default NavDropdown;
