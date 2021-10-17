import React from 'react';
import styled from 'styled-components';

const sections = [
  {
    name: 'Recruitment',
    description:
      'All-in-one tool to manage candidate applications and interviews',
    path: '/recruitment',
  },
  {
    title: 'Analytics',
    description:
      'Useful analytics to give us greater insight on the team as a whole',
    path: '/analytics',
  },
];

const LandingPage = () => {
  const sectionItems = sections.map((section) => (
    <Grid
      key={section.name}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      justify="center"
      container
    >
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
