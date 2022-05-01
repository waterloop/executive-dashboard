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

const PageTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold36};
`;

const CategoryTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.medium24};
  margin-inline-start: 24px;
`;

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
`;

const StyledTableContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  border: ${({ theme }) => theme.borders.solidGrey2};
  border-radius: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const StyledTabs = styled((props) => (
  <Tabs {...props} classes={{ indicator: 'indicator' }}/>
))`
  && {
    margin-inline-start: 24px;
  }
  && .indicator {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const StyledTab = styled(Tab)`
  && {
    color: ${({ theme }) => theme.colours.blacks.black1};
    background-color: ${({ theme }) => theme.colours.greys.grey1};
    border: ${({ theme }) => theme.borders.solidGrey2};
    border-bottom: 0;
    border-radius: 0.9375rem 0.9375rem 0 0;
    text-transform: none;
    font: ${({ theme }) => theme.fonts.medium20};
  }
  &&.Mui-selected {
    background-color: ${({ theme }) => theme.colours.white};
    color: ${({ theme }) => theme.colours.blacks.black1};
    -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
    -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
    box-shadow: ${({ theme }) => theme.shadows.shadow1};
  }
`;

const TabPanelBox = styled(Box)`
  && {
    margin-left: 24px;
    border: ${({ theme }) => theme.borders.solidGrey2};
    border-top: 0;
    border-bottom: 0;
    border-radius: 0.9375rem;
  }
`;

const WhiteSpaceBox = styled(Box)`
  && {
    padding-top: 24px;
    margin-left: 24px;
    background-color: ${({ theme }) => theme.colours.white};
    border: ${({ theme }) => theme.borders.solidGrey2};
    border-top: 0;
    border-bottom: 0;
    border-radius: 0 0.9375rem 0 0;
  }
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
      <WhiteSpaceBox/>
      {value === index && (
        <TabPanelBox>
          <Typography component="div">{children}</Typography>
        </TabPanelBox>
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
  filterCategories,
  filterRows,
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_, newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <Container>
      <PageTitle>Recruitment</PageTitle>
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
          md={3}
          item
          justifyContent="center"
          alignItems="stretch"
        >
          <PortalFilterTemplate filterCategories={filterCategories} />
        </Grid>
        <Grid container direction="row" md={9} item justifyContent="flex-start">
          <CategoryTitle>{portalName}</CategoryTitle>
          <Box sx={{ width: '95%', height: '100%' }}>
            <StyledTabs value={currentTab} onChange={handleTabChange}>
              {tabs.map((tab) => (
                <StyledTab label={tab.tabName} key={tab.tabName} />
              ))}
            </StyledTabs>
            {tabs.map((tab, index) => (
              <TabPanel value={currentTab} index={index} key={tab.tabName}>
                <StyledTableContainer>
                  <PortalTableTemplate
                    columns={tableColumns}
                    rows={filterRows(tab.status)}
                  />
                </StyledTableContainer>
              </TabPanel>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PortalTemplate;
