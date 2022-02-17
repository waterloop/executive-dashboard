import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import ApplicantPortalIcon from '../../assets/svg/recruitment/application-portal-icon.svg';
import InterviewPortalIcon from '../../assets/svg/recruitment/interview-portal-icon.svg';
import DecisionPortalIcon from '../../assets/svg/recruitment/decision-portal-icon.svg';

import theme from '../../theme';

const CardContainer = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;

  max-width: 13rem;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 0.9375rem;
  -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

const CardGrid = styled(Grid)`
  display: flex;
`;

/**
 * Provides breakpoint support on element layout.
 * */
const CardGroupGrid = styled(Grid)`
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    justify-content: center;
    & > div {
      margin-top: 1rem;
    }
  }
`;

const PlaceholderContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  // TODO: remove min-dimension requirements once content is available
  min-height: 20rem;

  -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
`;

const PageTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold36};
`;

const CardTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold24};
  text-align: center;
`;

const CardIcon = styled.img`
  width: 6rem;
  height: 6rem;
  margin-top: 1rem;
`;

const CardDescription = styled.p`
  font: ${({ theme }) => theme.fonts.medium16};
  color: ${({ theme }) => theme.colours.blacks.black3}};
  text-align: center;
`;

const LINK_PREFIX = '/recruitment';

const sections = [
  {
    name: 'Application Portal',
    description: 'Tap to view all applications',
    to: `${LINK_PREFIX}/application`,
    icon: ApplicantPortalIcon,
    backgroundColor: theme.colours.greens.green1,
  },
  {
    name: 'Interview Portal',
    description: 'Tap to view all interviewed applications',
    to: `${LINK_PREFIX}/interview`,
    icon: InterviewPortalIcon,
    backgroundColor: theme.colours.purples.purple1,
  },
  {
    name: 'Decision Portal',
    description:
      'Tap to view all acceptances and rejections from both Application and Interview portal',
    to: `${LINK_PREFIX}/decision`,
    icon: DecisionPortalIcon,
    backgroundColor: theme.colours.blues.blue3,
  },
];

// MOBILE/Tablet view: Overview should be first element (on top of page), followed by the 3 navigation portals,
// and finally the calendar should be last.
const RecruitmentLanding = () => {
  const history = useHistory();
  const sectionItems = sections.map((section) => (
    <CardGrid key={section.name} item>
      <CardContainer {...section} onClick={() => history.push(section.to)}>
        <CardTitle>{section.name}</CardTitle>
        <CardIcon src={section.icon} />
        <CardDescription>{section.description}</CardDescription>
      </CardContainer>
    </CardGrid>
  ));

  return (
    <>
      <Container>
        <PageTitle>Recruitment Dashboard</PageTitle>

        <Grid className="root-grid" container spacing={3}>
          <Grid item container justifyContent="space-between" xs={12}>
            <Grid item xs={12} lg={4}>
              <PlaceholderContainer className="overview">
                <CardTitle>[Overview Placeholder]</CardTitle>
              </PlaceholderContainer>
            </Grid>
            <CardGroupGrid item container spacing={1} lg={8} xs={12}>
              {sectionItems}
            </CardGroupGrid>
          </Grid>
          <Grid item xs={12}>
            <PlaceholderContainer className="calendar">
              <CardTitle>[Calendar Placeholder]</CardTitle>
            </PlaceholderContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RecruitmentLanding;
