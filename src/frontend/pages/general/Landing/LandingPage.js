import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

import RecruitmentSVG from '../../../assets/svg/recruitment-icon.svg';
import AnalyticsSVG from '../../../assets/svg/analytics-icon.svg';

import LandingCard from '../../../components/LandingCard';

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
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
    <Grid key={section.name} item>
      <LandingCard {...section} />
    </Grid>
  ));

  return (
    <Container>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {sectionItems}
      </Grid>
    </Container>
  );
};

export default LandingPage;
