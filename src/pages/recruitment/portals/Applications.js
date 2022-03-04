// TODO: Design contains "position" section in filter side. Define an API call frontend-side to grab this value (server-side call exists).

import React, { useState } from 'react';
import styled from 'styled-components';
// import Grid from '@material-ui/core/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';

import BasicTable from './ApplicationsTable';
import CheckboxesGroup from './Filter';

import { makeTruthTable } from '../../../utils';

import * as filterConstants from './Constants';

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
      aria-labelledby={`simple-tab-${index}`} // TODO: Don't need this, but leave it if it works.
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

// TODO: consider removing  propTypes as we most likely don't need it.
// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };
const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

// TODO: move these constants to a different file called Constants.js that can be used by all 3 portals. [DONE]
// TODO: change to UPPER_CASE and follow convention below for other 2 constants (+ any other global non-changing constants)
const { SUBTEAM_OPTIONS } =  filterConstants;
const { TERM_TYPE_OPTIONS } =  filterConstants;
const { YEAR_OPTIONS } =  filterConstants;

// !NOTE: Tab names and decision portal table slightly different (email status button).
// Design doesn't have term or year of study for decision portal.
const tabs = ['pending', 'interview', 'rejected', 'undecided'];

const Applications = () => {
  const [currentTab, setCurrentTab] = React.useState(0);

  // Used for filtering applications
  const [subteamsChecked, setSubteamsChecked] = useState(
    makeTruthTable(SUBTEAM_OPTIONS),
  );
  const [termTypesChecked, setTermTypesChecked] = useState(
    makeTruthTable(TERM_TYPE_OPTIONS),
  );
  const [yearsChecked, setYearsChecked] = useState(
    makeTruthTable(YEAR_OPTIONS),
  );

  const handleTabChange = (_, newTab) => {
    setCurrentTab(newTab);
  };

  // TODO (OPTIONAL): Make grids react responsively when in mobile mode (make it look good in mobile view).
  // TODO: fix console errors on browser.
  return (
    <Container>
      <h1>Recruitment</h1>
      <Grid
        container
        direction="row"
        md={12}
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Grid
          container
          direction="row"
          md={4}
          justifyContent="center"
          alignItems="stretch"
        >
          <Container>
            <CheckboxesGroup
              subteams={subteamsChecked}
              termTypes={termTypesChecked}
              years={yearsChecked}
              setSubteamsChecked={setSubteamsChecked}
              setTermTypesChecked={setTermTypesChecked}
              setYearsChecked={setYearsChecked}
            />
          </Container>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={1}
          md={8}
          justifyContent="center"
          alignItems="stretch"
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                aria-label="application status tabs"
              >
                {/* TODO: Dynamically define tabs using the .map function [DONE] */}
                {/* TODO: Format the strings (Upper-case, To interview, To reject, Undecided) */}
                {tabs.map((tab, index) => (
                  <Tab label={tab} {...a11yProps(index)} />
                ))}
              </Tabs>
            </Box>
            {tabs.map((tab, index) => (
              <TabPanel value={currentTab} index={index} key={tab}>
                <BasicTable
                  status={tab}
                  subteams={subteamsChecked}
                  termTypes={termTypesChecked}
                  years={yearsChecked}
                />
              </TabPanel>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Applications;
