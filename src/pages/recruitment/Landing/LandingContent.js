import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useRouteMatch } from 'react-router-dom';

import ApplicantPortalIcon from '../../../assets/svg/recruitment/application-portal-icon.svg';
import InterviewPortalIcon from '../../../assets/svg/recruitment/interview-portal-icon.svg';
import DecisionPortalIcon from '../../../assets/svg/recruitment/decision-portal-icon.svg';
import RecruitmentCard from '../../../components/RecruitmentCard';
import EmailModal from '../../../components/EmailModal';

import { sanitizeUrlPrefix } from '../../../utils';

import theme from '../../../theme';

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

const sections = (linkPrefix) => [
  {
    name: 'Application Portal',
    description: 'Tap to view all applications',
    to: `${linkPrefix}application`,
    icon: ApplicantPortalIcon,
    backgroundColor: theme.colours.greens.green1,
  },
  {
    name: 'Interview Portal',
    description: 'Tap to view all interviewed applicants',
    to: `${linkPrefix}interview`,
    icon: InterviewPortalIcon,
    backgroundColor: theme.colours.purples.purple1,
  },
  {
    name: 'Decision Portal',
    description:
      'Tap to view all acceptances and rejections from both Application and Interview portal',
    to: `${linkPrefix}decision`,
    icon: DecisionPortalIcon,
    backgroundColor: theme.colours.blues.blue3,
  },
];

// MOBILE/Tablet view: Overview should be first element (on top of page), followed by the 3 navigation portals,
// and finally the calendar should be last.
const RecruitmentLanding = () => {
  const linkPrefix = useRouteMatch().url;
  const sectionItems = sections(sanitizeUrlPrefix(linkPrefix)).map(
    (section) => <RecruitmentCard key={section.name} {...section} />,
  );

  return (
    <Container>
      <PageTitle>Recruitment Dashboard</PageTitle>

      <Grid container spacing={3}>
        <Grid item container justifyContent="space-between" xs={12}>
          <Grid item xs={12} lg={4}>
            <PlaceholderContainer>
              <CardTitle>[Overview Placeholder]</CardTitle>
            </PlaceholderContainer>
          </Grid>
          <CardGroupGrid item container spacing={1} lg={8} xs={12}>
            {sectionItems}
          </CardGroupGrid>
        </Grid>
        <Grid item xs={12}>
          <PlaceholderContainer>
            <CardTitle>[Calendar Placeholder]</CardTitle>
          </PlaceholderContainer>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {/* Remove this later (just for testing) */}
        <EmailModal status="interview_reject" />
      </Grid>
    </Container>
  );
};

export default RecruitmentLanding;
