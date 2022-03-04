import * as React from 'react';
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

const MIN_SUBTEAMS_SHOWN = 6;
const MIN_YEARS_SHOWN = 2;

const CheckboxesGroup = ({
  subteams,
  termTypes,
  years,
  setSubteamsChecked,
  setTermTypesChecked,
  setYearsChecked,
}) => {
  // TODO (JEFF): Go over all changes you made to make component more reusable and dynamic, and also go over
  // which constants can be used.

  const MAX_SUBTEAMS_SHOWN = subteams.length;
  const MAX_YEARS_SHOWN = years.length;

  const [subteamsShown, setSubteamsShown] = useState(MIN_SUBTEAMS_SHOWN);
  const [yearsShown, setYearsShown] = useState(MIN_YEARS_SHOWN);

  // TODO: Grab team names from an api call. Do not hardcode it into parameters like this.
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
            {/* NOTE: May not need to define MAX elements to show. */}
            {subteams.slice(0, subteamsShown).map((team, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    // NOTE: DO NOT USE eval!!!!
                    checked={eval(team)}
                    onChange={handleChange}
                    name={team}
                    key={index + 100}
                  />
                }
                label={
                  // TODO: This capitalization should be done while preprocessing the data coming from the server BEFORE using it here.
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
          {subteamsShown < MAX_SUBTEAMS_SHOWN && (
            <Button
              variant="text"
              onClick={() => {
                setSubteamsShown(MAX_SUBTEAMS_SHOWN);
              }}
            >
              Show all...
            </Button>
          )}
          {subteamsShown === MAX_SUBTEAMS_SHOWN && (
            <Button
              variant="text"
              onClick={() => {
                setSubteamsShown(MIN_SUBTEAMS_SHOWN);
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
            {/* TODO: Use map to dynamically load content. */}
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
            {allYears.slice(0, yearsShown).map((year) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={years[year]}
                    onChange={() => {
                      setYearsChecked({
                        ...years,
                        year: !years[year],
                      });
                    }}
                    name={year}
                  />
                }
                label={year}
                key={year}
              />
            ))}
          </FormGroup>
          <Button
            variant="text"
            onClick={() => {
              setYearsShown(
                yearsShown === MAX_YEARS_SHOWN
                  ? MIN_YEARS_SHOWN
                  : MAX_YEARS_SHOWN,
              );
            }}
          >
            {yearsShown === MAX_YEARS_SHOWN ? 'Show less...' : 'Show more...'}
          </Button>
        </FormControl>
      </Grid>
    </Container>
  );
};

export default CheckboxesGroup;
