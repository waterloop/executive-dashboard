import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import RecruitmentSVG from '../../assets/recruitment-icon.svg';
import AnalyticsSVG from '../../assets/analytics-icon.svg';
import LandingCard from '../../components/LandingCard';

const Section = styled(LandingCard)`
  margin-right: 56px;
  margin-left: 56px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  padding-top: 96px;
  padding-right: calc(min(128px, 10%));
  padding-left: calc(min(128px, 10%));
`;

const sections = [
  {
    name: 'Recruitment',
    description:
      'All-in-one tool to manage candidate applications and interviews',
    to: '/recruitment',
    icon: RecruitmentSVG,
  },
  {
    name: 'Analytics',
    description:
      'Useful analytics to give us greater insight on the team as a whole',
    to: '/analytics',
    icon: AnalyticsSVG,
  },
];

const LandingPage = () => {
  const sectionItems = sections.map((section) => (
    <Grid key={section.name} item xs={12} sm={6} justify="center">
      <Section {...section} />
    </Grid>
  ));

  return (
    <Container>
      <Grid container justify="center">
        {sectionItems}
      </Grid>
    </Container>
  );
};

export default LandingPage;
