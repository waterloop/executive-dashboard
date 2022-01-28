import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MUIInputLabel from '@mui/material/InputLabel';
import MUIMenuItem from '@mui/material/MenuItem';
import MUIFormControl from '@mui/material/FormControl';
import MUISelect from '@mui/material/Select';

const LinkContainer = styled.div`
  & > div {
    margin-left: 20px;
  }
  display: inline-flex;
`

const FormControl = styled(MUIFormControl)`
  width: 120px;
`;

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
    <LinkContainer>
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
    </LinkContainer>
  );
};

export default NavDropdown;
