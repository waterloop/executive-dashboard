import React from 'react';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button'; 

const PortalFilterTemplate = ({ filterCategories }) => (
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

export default PortalFilterTemplate;
