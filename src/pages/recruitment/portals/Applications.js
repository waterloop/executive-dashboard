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
      aria-labelledby={`simple-tab-${index}`}
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

TabPanel.propTypes = {
  /* eslint-disable */
  children: PropTypes.node,
  /* eslint-enable */
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
/* eslint-disable */
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Applications = () => {
  const subteamChecked = {
    web: true,
    electrical: true,
    mechanical: true,
  };

  const termTypeChecked = {
    study: true,
    coop: true,
  };

  const tabs = [
    'pending', 'interview', 'rejected', 'undecided'
  ]

  const [value, setValue] = React.useState(0);
  const [subteam, setSubteam] = useState(subteamChecked);
  const [termType, setTermType] = useState(termTypeChecked);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getSubteam = (childData) => {
    setSubteam(childData);
  };

  const getTermType = (childData) => {
    setTermType(childData);
  };

  return (
    <Container>
      <h1>Recruitment</h1>
      <Grid
        container
        direction="row"
        md={12}
        justifyContent="left"
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
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Pending" {...a11yProps(0)} />
                <Tab label="To interview" {...a11yProps(1)} />
                <Tab label="To reject" {...a11yProps(2)} />
                <Tab label="Undecided" {...a11yProps(3)} />
              </Tabs>
            </Box>
            {tabs.map((tab, index) => (
              <TabPanel value={value} index={index}>
              <BasicTable
                status={tabs[index]}
                subteams={subteam}
                termTypes={termType}
              />
            </TabPanel>
            )
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Applications;
