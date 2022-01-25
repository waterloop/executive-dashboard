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

const sections = [
  {
    name: 'Application Portal',
    description:
      'To view all applications',
    to: '/recruitment/application',
    icon: ApplicantPortalIcon,
    backgroundColor: theme.colours.greens.green1
  },
  {
    name: 'Interview Portal',
    description:
      'To view all interviewed applications',
    to: '/recruitment/interview',
    icon: InterviewPortalIcon,
    backgroundColor: theme.colours.purples.purple1
  },
  {
    name: 'Decision Portal',
    description:
      'To view all acceptances and rejections from both Application and Interview portal',
    to: '/recruitment/decision',
    icon: DecisionPortalIcon,
    backgroundColor: theme.colours.blues.blue3
  },
];
// MOBILE/Tablet view: Overview on top, calendar second, then rest is navigation.
const RecruitmentLanding = () => {
  const sectionItems = sections.map((section) => (
    <Grid key={section.name} item>
      <LandingCard {...section} width='fit-content' maxWidth={"200px"} /> 
    </Grid>
  ));

  return (
    <>
    {/* TODO: Fix header font. */}
      <Container>
        <h1>Recruitment Dashboard</h1>
        {/* TODO: Add placeholder components for calendar and stats */}
        {/* TODO: Add 3 portal navigation components */}
        {/* 4-8 split */}
        <Grid container direction="row" md={12} justifyContent="center" alignItems="stretch">
          <Grid container direction="row" md={4} justifyContent="center" alignItems="stretch">
            <Container>
              PLACEHOLDER
            </Container>
          </Grid>
          <Grid container direction="row" spacing={1} md={8} justifyContent="center" alignItems="stretch">
            {sectionItems}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RecruitmentLanding;
