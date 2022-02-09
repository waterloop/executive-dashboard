import * as React from 'react';
/* eslint-disable */
import { useState } from 'react';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@material-ui/core/Grid';

export default function CheckboxesGroup({ getSubteam, getTermTypes }) {
  const [subteams, setSubteams] = useState({
    web: true,
    electrical: true,
    mechanical: true,
  });

  const [termTypes, setTermTypes] = useState({
    study: true,
    coop: true,
  });

  const handleChange = (event) => {
    if (event.target.name in subteams) {
      const newChecked = {
        ...subteams,
        [event.target.name]: event.target.checked,
      };
      setSubteams(newChecked);
      getSubteam(newChecked);
    } else if (event.target.name in termTypes) {
      const newChecked = {
        ...termTypes,
        [event.target.name]: event.target.checked,
      };
      setTermTypes(newChecked);
      getTermTypes(newChecked);
    }
  };

  const { web, electrical, mechanical } = subteams;
  console.log(subteams);
  const { study, coop } = termTypes;

  return (
    <Container>
      <Grid
        container
        direction="row"
        md={12}
        justifyContent="left"
        alignItems="stretch"
      >
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Filters</FormLabel>
          <FormHelperText>Subteam</FormHelperText>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={web} onChange={handleChange} name="web" />
              }
              label="Web"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={electrical}
                  onChange={handleChange}
                  name="electrical"
                />
              }
              label="Electrical"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={mechanical}
                  onChange={handleChange}
                  name="mechanical"
                />
              }
              label="Mechanical"
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid
        container
        direction="row"
        md={12}
        justifyContent="left"
        alignItems="stretch"
      >
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormHelperText>Term</FormHelperText>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={study}
                  onChange={handleChange}
                  name="study"
                />
              }
              label="Study"
            />
            <FormControlLabel
              control={
                <Checkbox checked={coop} onChange={handleChange} name="coop" />
              }
              label="Co-op"
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Container>
  );
}
