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
import Button from '@mui/material/Button';

const allSubteams = [
  'web',
  'electrical',
  'mechanical',
  'lim',
  'business',
  'infrastructure',
  'propulsion',
  'bms',
  'embedded',
  'motorControl',
  'communications',
  'firmware',
];

const allYears = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A'];

export default function CheckboxesGroup({ getSubteam, getTermTypes, getYear }) {
  // TODO: You already have this state defined in Applications.js. Let's instead pass in both the state and setState variables
  // directly from the parent to avoid its redefinition here.
  const [subteams, setSubteams] = useState({
    web: true,
    electrical: true,
    mechanical: true,
    lim: true,
    business: true,
    infrastructure: true,
    propulsion: true,
    bms: true,
    embedded: true,
    motorControl: true,
    communications: true,
    firmware: true,
  });

  const [termTypes, setTermTypes] = useState({
    study: true,
    coop: true,
  });

  const [years, setYear] = useState({
    _1A: true,
    _1B: true,
    _2A: true,
    _2B: true,
    _3A: true,
    _3B: true,
    _4A: true,
    _4B: true,
    _5A: true,
  });

  // TODO: create constants for minimal subteams and years shown, as well as full subteams + years shown.
  const [subteamsShown, setSubteamsShown] = useState(6);
  const [yearsShown, setYearsShown] = useState(2);

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
    } else if (event.target.name in years) {
      const newChecked = {
        ...years,
        [event.target.name]: event.target.checked,
      };
      setYear(newChecked);
      getYear(newChecked);
    }
  };

  // TODO: Grab team names from an api call. Do not hardcode it into parameters like this.
  const {
    web,
    electrical,
    mechanical,
    lim,
    business,
    infrastructure,
    propulsion,
    bms,
    embedded,
    motorControl,
    communications,
    firmware,
  } = subteams;

  const { study, coop } = termTypes;

  const { _1A, _1B, _2A, _2B, _3A, _3B, _4A, _4B, _5A } = years;

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
            {allSubteams.slice(0, subteamsShown).map((team, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eval(team)}
                    onChange={handleChange}
                    name={team}
                    key={index + 100}
                  />
                }
                label={
                  team.charAt(0).toUpperCase() +
                  team
                    .slice(1)
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                }
                key={index}
              />
            ))}
          </FormGroup>
          {subteamsShown < 12 && (
            <Button
              variant="text"
              onClick={() => {
                setSubteamsShown(12);
              }}
            >
              Show all...
            </Button>
          )}
          {subteamsShown == 12 && (
            <Button
              variant="text"
              onClick={() => {
                setSubteamsShown(6);
              }}
            >
              Show less...
            </Button>
          )}
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
      <Grid
        container
        direction="row"
        md={12}
        justifyContent="left"
        alignItems="stretch"
      >
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormHelperText>Year of Study</FormHelperText>
          <FormGroup>
            {allYears.slice(0, yearsShown).map((year, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    // TODO: DO NOT USE eval(), it's generally considered bad practice.
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
                    checked={eval('_' + year)}
                    onChange={handleChange}
                    name={'_' + year}
                    key={index + 1000}
                  />
                }
                label={year}
                key={index + 2000}
              />
            ))}
          </FormGroup>
          {yearsShown < 9 && (
            <Button
              variant="text"
              onClick={() => {
                setYearsShown(9);
              }}
            >
              Show all...
            </Button>
          )}
          {yearsShown == 9 && (
            <Button
              variant="text"
              onClick={() => {
                setYearsShown(2);
              }}
            >
              Show less...
            </Button>
          )}
        </FormControl>
      </Grid>
    </Container>
  );
}
