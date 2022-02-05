import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import ApplicantPortalIcon from '../../assets/svg/recruitment/application-portal-icon.svg';
import InterviewPortalIcon from '../../assets/svg/recruitment/interview-portal-icon.svg';
import DecisionPortalIcon from '../../assets/svg/recruitment/decision-portal-icon.svg';

/* eslint-disable */
import LandingCard from '../../components/LandingCard';

import theme from '../../theme';

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
`;

const PageTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold36};
`;

const styles = {
  descriptionColor: theme.colours.greys.grey3,
  cardTitle: theme.fonts.bold24,
  descriptionFont: theme.fonts.medium16,
  iconWidth: '125px',
  iconHeight: '125px',
  padding: '40px',
  width: '225px',
  height: '388px',
  justifyContent: 'space-between',
};

const sections = [
  {
    name: 'Application Portal',
    description: 'To view all applications',
    to: '/recruitment/application',
    icon: ApplicantPortalIcon,
    backgroundColor: theme.colours.greens.green1,
  },
  {
    name: 'Interview Portal',
    description: 'To view all interviewed applications',
    to: '/recruitment/interview',
    icon: InterviewPortalIcon,
    backgroundColor: theme.colours.purples.purple1,
  },
  {
    name: 'Decision Portal',
    description:
      'To view all acceptances and rejections from both Application and Interview portal',
    to: '/recruitment/decision',
    icon: DecisionPortalIcon,
    backgroundColor: theme.colours.blues.blue3,
  },
];

const overview = {
  name: 'Overview',
  description: 'TODO',
  to: '',
  icon: 'https://i.imgur.com/OvMZBs9.jpg',
  backgroundColor: theme.colours.white,
  descriptionColor: theme.colours.greys.grey3,
  width: '300px',
  padding: '40px',
  height: '388px',
  justifyContent: 'space-between',
};

const calendar = {
  name: 'Calendar',
  description: 'TODO',
  to: '',
  icon: 'https://i.imgur.com/OvMZBs9.jpg',
  backgroundColor: theme.colours.white,
  descriptionColor: theme.colours.greys.grey3,
  width: '80vw',
  margin: '20px',
  height: '350px',
  justifyContent: 'space-between',
};

sections.forEach((section) => {
  Object.assign(section, styles);
});

// MOBILE/Tablet view: Overview on top, calendar second, then rest is navigation.
const RecruitmentLanding = () => {
  const overviewCard = (
    <Grid key="overview" item>
      <LandingCard {...overview} />
    </Grid>
  );

  const sectionItems = sections.map((section) => (
    <Grid key={section.name} item>
      <LandingCard {...section} />
    </Grid>
  ));

  const calendarCard = (
    <Grid key="calendar" item>
      <LandingCard {...calendar} />
    </Grid>
  );

  return (
    <>
      <Container>
        <PageTitle>Recruitment Dashboard</PageTitle>
        {/* 4-8 split */}
        <Grid
          container
          direction="row"
          md={12}
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid
            container
            direction="row"
            md={4}
            justifyContent="center"
            alignItems="stretch"
          >
            {overviewCard}
          </Grid>
          <Grid
            container
            direction="row"
            spacing={1}
            md={8}
            justifyContent="center"
            alignItems="stretch"
          >
            {sectionItems}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={1}
          md={12}
          justifyContent="center"
          alignItems="stretch"
        >
          {calendarCard}
        </Grid>
      </Container>
    </>
  );
};

export default RecruitmentLanding;
