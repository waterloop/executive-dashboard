// TODO: Design contains "position" section in filter side. Define an API call frontend-side to grab this value (server-side call exists).

import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
// import Grid from '@material-ui/core/Grid';
/* eslint-disable */
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';

import BasicTable from './ApplicationsTable';
import CheckboxesGroup from './Filter';

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
`;

function TabPanel(props) {
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
}

// TODO: consider removing  propTypes as we most likely don't need it.
TabPanel.propTypes = {
  /* eslint-disable */
  children: PropTypes.node,
  /* eslint-enable */
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
/* eslint-disable */
const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

// TODO: move these constants to a different file called Constants.js that can be used by all 3 portals.
// TODO: change to UPPER_CASE and follow convention below for other 2 constants (+ any other global non-changing constants)
const SUBTEAM_FILTER_OPTIONS = {
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
};

const termTypeChecked = {
  study: true,
  coop: true,
};

const yearsChecked = {
  _1A: true,
  _1B: true,
  _2A: true,
  _2B: true,
  _3A: true,
  _3B: true,
  _4A: true,
  _4B: true,
  _5A: true,
};

// Tab names and decision portal table slightly different (email status button).
// Design doesn't have term or year of study.
const tabs = ['pending', 'interview', 'rejected', 'undecided'];

const Applications = () => {
  const [currentTab, setCurrentTab] = React.useState(0);

  // Used for filtering applications
  const [subteam, setSubteam] = useState(SUBTEAM_FILTER_OPTIONS);
  const [termType, setTermType] = useState(termTypeChecked);
  const [year, setYear] = useState(yearsChecked);

  const handleChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  // TODO: you can pass in function name as an argument directly into callback/function parameters. Do it to the following 3
  const getSubteam = (childData) => {
    setSubteam(childData);
  };

  const getTermType = (childData) => {
    setTermType(childData);
  };

  const getYear = (childData) => {
    setYear(childData);
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
              getSubteam={getSubteam}
              getTermTypes={getTermType}
              getYear={getYear}
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
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {/* TODO: Dynamically define tabs using the .map function */}
                <Tab label="Pending" {...a11yProps(0)} />
                <Tab label="To interview" {...a11yProps(1)} />
                <Tab label="To reject" {...a11yProps(2)} />
                <Tab label="Undecided" {...a11yProps(3)} />
              </Tabs>
            </Box>
            {tabs.map((tab, index) => (
              <TabPanel value={currentTab} index={index} key={index}>
                <BasicTable
                  status={tab}
                  subteams={subteam}
                  termTypes={termType}
                  years={year}
                  key={index + 1000} // TODO: Determine if this line can be removed.
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
