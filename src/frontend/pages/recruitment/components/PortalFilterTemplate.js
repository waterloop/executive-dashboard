import React from 'react';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import { Typography } from '@material-ui/core';
// TODO: Don't hardcode margin-inline-start
const FiltersTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.medium24};
  margin-inline-start: 24px;
`;

const CheckboxCategoryName = styled.h1`
  font: ${({ theme }) => theme.fonts.bold16};
  margin-top: 0;
`;

const CheckboxName = styled(Typography)`
  && {
    font: ${({ theme }) => theme.fonts.medium16};
  }
`;

const ShowMoreAndLessButton = styled(Button)`
  && {
    font: ${({ theme }) => theme.fonts.medium14};
    text-transform: none;
    padding: 0;
    justify-content: flex-start;
  }
`;

const NoEntriesDefaultText = styled.p`
  font: ${({ theme }) => theme.fonts.medium12};
  color: #76797c;
  margin-top: 0;
  margin-bottom: 0;
`;

const CheckboxGroup = styled(FormControl)`
  && {
    margin-top: 0;
  }
`;

const FiltersContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  border: ${({ theme }) => theme.borders.solidGrey2};
  border-radius: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;

  -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

const PortalFilterTemplate = ({ filterCategories }) => (
  <FiltersContainer>
    <FiltersTitle component="legend">Filters</FiltersTitle>
    {filterCategories.map((category) => (
      <Grid
        container
        direction="row"
        md={12}
        item
        justifyContent="flex-start"
        key={category.name}
      >
        <CheckboxGroup sx={{ m: 3 }} component="fieldset" variant="standard">
          <CheckboxCategoryName>{category.formattedName}</CheckboxCategoryName>
          <FormGroup>
            {category.currentShown !== 0 &&
            Object.keys(category.checked).length !== 0 ? (
              category.options
                .slice(0, category.currentShown)
                .map((checkbox) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={category.checked[checkbox.name]}
                        onChange={(checkbox) =>
                          category.setCategoryChecked(checkbox)
                        }
                        name={checkbox.name}
                        sx={{
                          '&.Mui-checked': {
                            color: '#1B8FF4',
                          },
                        }}
                      />
                    }
                    label={
                      <CheckboxName>
                        {'formattedName' in checkbox
                          ? checkbox.formattedName
                          : checkbox.name}
                      </CheckboxName>
                    }
                    key={checkbox.name}
                  />
                ))
            ) : (
              <NoEntriesDefaultText>
                {category.noEntriesDefaultText}
              </NoEntriesDefaultText>
            )}
          </FormGroup>
          {category.setCategoryShown && category.minShown < category.maxShown && (
            <ShowMoreAndLessButton
              variant="text"
              onClick={category.setCategoryShown}
            >
              {category.currentShown === category.maxShown
                ? 'Show less...'
                : 'Show all...'}
            </ShowMoreAndLessButton>
          )}
        </CheckboxGroup>
      </Grid>
    ))}
  </FiltersContainer>
);

export default PortalFilterTemplate;
