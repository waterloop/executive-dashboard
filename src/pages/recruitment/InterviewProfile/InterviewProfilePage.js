import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import blobs from '../../../assets/svg/recruitment/interview/blobs.svg';

import Header from '../../../components/ProfileTemplate/Header';
import Sidebar from '../../../components/ProfileTemplate/Sidebar';

import useApplications from '../../../hooks/applications';

import { getTermDate } from '../../../utils';

import { options, backgrounds, statuses } from './Constants';

// TODO: Make this a mock test variable.
const FALL_2022 = new Date(1662352157000);

const Container = styled.div`
  margin: 0;
`;

const ContentGrid = styled(Grid)`
  position: relative;
  top: 9rem;
  z-index: 0;
  padding: 64px 82px 64px 82px;
`;

const InterviewContainer = styled(Grid)`
  position: relative;
  padding-bottom: 1rem;
`;

const Title = styled.h1`
  font: ${({ theme }) => theme.fonts.bold30};
  padding-bottom: 1rem;
`;

const TextArea = styled.textarea`
  border: 1.20312px solid #000000;
  border-radius: 6px;
  position: relative;
  width: 80%;
  height: 200px;
  padding: 10px;
  font: ${({ theme }) => theme.fonts.medium18};
`;

const PlaceholderContainer = styled.div`
  width: 82%;
  height: 200px;
  border-radius: 6px;
  background: white;
  font: ${({ theme }) => theme.fonts.bold24};
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Functions:
const makeProfileData = (app) =>
  app
    ? {
        id: app.id,
        fullName: `${app.first_name} ${app.last_name}`,
        program: app.program,
        term: `${app.current_year} ${app.in_school ? 'Study' : 'Co-op'}`,
        resumeLink: app.resume_link,
        status: app.status,
        reasonToJoin: app.reason_to_join || '(none provided)',
        additionalInfo: app.additional_information || '(none provided)',
      }
    : {};

const InterviewProfilePage = () => {
  const history = useHistory();
  const match = useRouteMatch('/recruitment/INTERVIEW/:id');
  const { applications, updateAppStatus } = useApplications(
    getTermDate(FALL_2022),
  ); // TODO: in production, replace with Date.now().
  // TODO: Currently logic doesn't support loading page info for a previous posting.

  const application = applications.find(
    (app) => `${app.id}` === match.params.id,
  );

  // Curry updateAppStatus function:
  const updateAppStatusCurried = (appID) => (newStatus) => {
    updateAppStatus(appID, newStatus);
  };

  const profileData = makeProfileData(application);

  return (
    <Container>
      <Header
        name={profileData.fullName}
        blobs={blobs}
        background="linear-gradient(91.05deg, #CAD4FF 0%, #FEEDED 99.9%)"
        handleBackClick={() => history.push('/recruitment/interview')}
      />
      {/* application info takes up 3/4 of height */}
      <ContentGrid justifyContent="flex-start" item xs={12} container>
        {/* sidebar takes up 1/3 of width */}
        <Grid item xs={12} md={4}>
          <Sidebar
            program={profileData.program}
            term={profileData.term}
            resumeLink={profileData.resumeLink}
            options={options}
            backgrounds={backgrounds}
            statuses={statuses}
            locked={!statuses[profileData.status]}
            errorMessage="Please change in application profile!"
            initialStatus={
              statuses[profileData.status]
                ? profileData.status
                : 'app_undecided'
            }
            updateStatus={updateAppStatusCurried(profileData.id)}
          />
        </Grid>
        {/* main content takes up 2/3 of width */}
        <Grid item xs={12} md={8}>
          <InterviewContainer item xs={12}>
            <Title>Interview Notes</Title>
            <TextArea placeholder="(please enter interview notes here)" />
          </InterviewContainer>
          <InterviewContainer item>
            <Title>Rating</Title>
            <PlaceholderContainer>[Ratings Placeholder]</PlaceholderContainer>
          </InterviewContainer>
        </Grid>
      </ContentGrid>
    </Container>
  );
};

export default InterviewProfilePage;
