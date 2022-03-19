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
import { SUBTEAM_OPTIONS, TERM_TYPE_OPTIONS, YEAR_OPTIONS } from './Constants';

const MIN_SUBTEAMS_SHOWN = 6;
const MIN_YEARS_SHOWN = 2;

const PortalFilterTemplate = ({
  subteams,
  termTypes,
  years,
  setSubteamsChecked,
  setTermTypesChecked,
  setYearsChecked,
}) => {
  const MAX_SUBTEAMS_SHOWN = subteams.length;
  const MAX_YEARS_SHOWN = years.length;

  const [subteamsShown, setSubteamsShown] = useState(MIN_SUBTEAMS_SHOWN);
  const [yearsShown, setYearsShown] = useState(MIN_YEARS_SHOWN);

  const filterCategories = [
    {
      name: 'subteams',
      formattedName: 'Subteams',
      currentShown: subteamsShown,
      checked: subteams,
      maxShown: MAX_SUBTEAMS_SHOWN,
      minShown: MIN_SUBTEAMS_SHOWN,
      options: SUBTEAM_OPTIONS,
      setCategoryChecked: (checkboxName) => {
        setSubteamsChecked({
          ...subteams,
          [checkboxName.target.name]: !subteams[checkboxName.target.name],
        });
      },
      setCategoryShown: () => {
        setSubteamsShown(
          subteamsShown === MAX_SUBTEAMS_SHOWN
            ? MIN_SUBTEAMS_SHOWN
            : MAX_SUBTEAMS_SHOWN,
        );
      },
    },
    {
      name: 'termTypes',
      formattedName: 'Term',
      currentShown: termTypes.length,
      checked: termTypes,
      maxShown: termTypes.length,
      minShown: termTypes.length,
      options: TERM_TYPE_OPTIONS,
      setCategoryChecked: (checkboxName) => {
        setTermTypesChecked({
          ...termTypes,
          [checkboxName.target.name]: !termTypes[checkboxName.target.name],
        });
      },
    },
    {
      name: 'years',
      formattedName: 'Year of Study',
      currentShown: yearsShown,
      checked: years,
      maxShown: MAX_YEARS_SHOWN,
      minShown: MIN_YEARS_SHOWN,
      options: YEAR_OPTIONS,
      setCategoryChecked: (checkboxName) => {
        setYearsChecked({
          ...years,
          [checkboxName.target.name]: !years[checkboxName.target.name],
        });
      },
      setCategoryShown: () => {
        setYearsShown(
          yearsShown === MAX_YEARS_SHOWN ? MIN_YEARS_SHOWN : MAX_YEARS_SHOWN,
        );
      },
    },
  ];

  return (
    <Container>
      <FormLabel component="legend">Filters</FormLabel>
      {filterCategories.map((category) => (
        <Grid
          container
          direction="row"
          md={12}
          item
          justifyContent="flex-start"
          alignItems="stretch"
          key={category.name}
        >
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormHelperText>{category.formattedName}</FormHelperText>
            <FormGroup>
              {category.options
                .slice(0, category.currentShown)
                .map((checkboxName) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={category.checked[checkboxName]}
                        onChange={(checkboxName) =>
                          category.setCategoryChecked(checkboxName)
                        }
                        name={checkboxName}
                      />
                    }
                    label={checkboxName}
                    key={checkboxName}
                  />
                ))}
            </FormGroup>
            {category.setCategoryShown && (
              <Button variant="text" onClick={category.setCategoryShown}>
                {category.currentShown === category.maxShown
                  ? 'Show less...'
                  : 'Show more...'}
              </Button>
            )}
          </FormControl>
        </Grid>
      ))}
    </Container>
  );
};

export default PortalFilterTemplate;
