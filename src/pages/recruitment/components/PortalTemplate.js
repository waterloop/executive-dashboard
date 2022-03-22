// TODO: Design contains "position" section in filter side. Define an API call frontend-side to grab this value (server-side call exists).

import React, { useState } from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';

import PortalTableTemplate from './PortalTableTemplate';
import PortalFilterTemplate from './PortalFilterTemplate';

// import { makeTruthTable } from '../../../utils';
/*
import {
  SUBTEAM_OPTIONS, TERM_TYPE_OPTIONS,
  YEAR_OPTIONS,
} from './Constants'; */

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
`;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

// !NOTE: Tab names and decision portal table slightly different (email status button).
// Design doesn't have term or year of study for decision portal.

const PortalTemplate = ({
  portalName,
  tabs,
  tableColumns,
  rows,
  subteamsChecked,
  termTypesChecked,
  yearsChecked,
  filterCategories,
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_, newTab) => {
    setCurrentTab(newTab);
  }; 

  return (
    <Container>
      <h1>Recruitment</h1>
      <Grid
        container
        direction="row"
        md={12}
        item
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Grid
          container
          direction="row"
          md={4}
          item
          justifyContent="center"
          alignItems="stretch"
        >
          <Container>
            <PortalFilterTemplate
              filterCategories={filterCategories}
            />
          </Container>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={1}
          md={8}
          item
          justifyContent="center"
          alignItems="stretch"
        >
          <h1>{portalName}</h1>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={currentTab} onChange={handleTabChange}>
                {/* TODO: Format the strings (Upper-case, To interview, To reject, Undecided) */}
                {tabs.map((tab) => (
                  <Tab label={tab} key={tab} />
                ))}
              </Tabs>
            </Box>
            {tabs.map((tab, index) => (
              <TabPanel value={currentTab} index={index} key={tab}>
                <PortalTableTemplate
                  status={tab}
                  subteams={subteamsChecked}
                  termTypes={termTypesChecked}
                  years={yearsChecked}
                  columns={tableColumns}
                  rows={rows}
                />
              </TabPanel>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PortalTemplate;
