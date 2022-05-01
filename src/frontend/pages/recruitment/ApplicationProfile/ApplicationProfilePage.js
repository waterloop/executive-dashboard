import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import blobs from '../../../assets/svg/recruitment/application/blobs.svg';

import Header from '../../../components/ProfileTemplate/Header';
import Sidebar from '../../../components/ProfileTemplate/Sidebar';

import useApplications from '../../../hooks/applications';
import usePostings from '../../../hooks/postings';

import { getTermDate } from '../../../utils';

import { backgrounds, statuses, postingColours } from './Constants';

// TODO: App and Interview profile pages share many similar styled-components / functions.
// Move them to common file.

// TODO: Make this a mock test variable.
const FALL_2022 = new Date(1662352157000);

const Container = styled.div`
  margin: 0;
`;

const ContentGrid = styled(Grid)`
  position: relative;
  top: 12rem;
  z-index: 0;
  padding: 64px 82px 64px 82px;
`;

const PostingGrid = styled(Grid)`
  z-index: 0;
`;

const Title = styled.h1`
  font: ${({ theme }) => theme.fonts.bold30};
  padding-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font: ${({ theme }) => theme.fonts.bold18};
  padding-bottom: 1rem;
`;

const ApplicationText = styled.p`
  font: ${({ theme }) => theme.fonts.medium16};
  margin: 0;
  padding-bottom: 1rem;
`;

const PostingContainer = styled(Grid)`
  display: flex;
`;

const PostingBubble = styled.div`
  display: flex;
  border-radius: 30px;
  background-color: ${(props) => props.colour};
  width: max-content;
  padding: 0.5rem 1.25rem;
  height: 20px;
`;

const PostingButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const makePostingComponents = (postings, handleClick) =>
  postings.map((posting, index) => (
    <PostingContainer key={posting.appID} item>
      <PostingBubble colour={postingColours[index % postingColours.length]}>
        <ApplicationText>
          <PostingButton onClick={() => handleClick(posting)}>
            {posting.title}
          </PostingButton>
        </ApplicationText>
      </PostingBubble>
    </PostingContainer>
  ));

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

const makePostingData = (apps, postings) =>
  apps.map((app) => {
    const res = postings.find((posting) => posting.id === app.posting_id);

    return {
      appID: app.id,
      title: res && res.title,
    };
  });

const ApplicationProfilePage = () => {
  // TODO: redirect user to 404 page if application not found. Use useHistory hook
  const match = useRouteMatch('/recruitment/application/:id');
  const history = useHistory();
  const { postings } = usePostings();
  const { applications, updateAppStatus, getApplicationsByEmail, appsByEmail } =
    useApplications(getTermDate(FALL_2022)); // TODO: in production, replace with Date.now().
  // TODO: Currently logic doesn't support loading page info for a previous posting.

  const application = applications.find(
    (app) => `${app.id}` === match.params.id,
  );

  const [currPostings, setCurrPostings] = useState([]);
  const [prevPostings, setPrevPostings] = useState([]);

  useEffect(() => {
    if (application && application.email_address) {
      getApplicationsByEmail(application.email_address);
    }
  }, [getApplicationsByEmail, application]);

  useEffect(() => {
    // TODO: It's better to call get application by ID instead of getting all apps:
    if (appsByEmail && application && appsByEmail[application.email_address]) {
      // Call posting functions here.
      const allUserApps = appsByEmail[application.email_address];

      const currTermDate = getTermDate(FALL_2022);
      const prevTermDate = getTermDate(
        new Date(new Date(FALL_2022).setMonth(FALL_2022.getMonth() - 4)),
      );

      setCurrPostings(
        makePostingData(
          allUserApps.filter((app) => app.application_term === currTermDate),
          postings,
        ),
      );
      setPrevPostings(
        makePostingData(
          allUserApps.filter((app) => app.application_term === prevTermDate),
          postings,
        ),
      );
    }
  }, [appsByEmail, application, postings]);

  // Curry updateAppStatus function:
  const updateAppStatusCurried = (appID) => (newStatus) => {
    updateAppStatus(appID, newStatus);
  };

  const profileData = makeProfileData(application);

  const handleClick = (posting) => {
    history.push(`/recruitment/application/${posting.appID}`);
  };

  return (
    <Container>
      <Header
        name={profileData.fullName}
        currentPostings={[...new Set(currPostings.map((a) => a.title))]}
        blobs={blobs}
        background="linear-gradient(91.05deg, #CAD4FF 0%, #CEF6FF 99.9%)"
        handleBackClick={() => history.push('/recruitment/application')}
      />
      {/* application info takes up 3/4 of height */}
      <ContentGrid justifyContent="flex-start" item xs={12} container>
        {/* sidebar takes up 1/3 of width */}
        <Grid item xs={12} md={4}>
          <Sidebar
            program={profileData.program}
            term={profileData.term}
            resumeLink={profileData.resumeLink}
            backgrounds={backgrounds}
            statuses={statuses}
            locked={!statuses[profileData.status]}
            errorMessage="Please change in interview profile!"
            initialStatus={
              statuses[profileData.status]
                ? profileData.status
                : 'interview_pending'
            }
            updateStatus={updateAppStatusCurried(profileData.id)}
          />
        </Grid>
        {/* main content takes up 2/3 of width */}
        <Grid item xs={12} md={8}>
          <Title>Application</Title>
          <Subtitle>Why do you want to join the team?</Subtitle>
          <ApplicationText>{profileData.reasonToJoin}</ApplicationText>
          <Subtitle>Additional Information</Subtitle>
          <ApplicationText>{profileData.additionalInfo}</ApplicationText>
          <Subtitle>Current Postings</Subtitle>
          <PostingGrid container spacing={1}>
            {makePostingComponents(currPostings, handleClick)}
          </PostingGrid>
          <Subtitle>Previous Postings</Subtitle>
          <PostingGrid container spacing={1}>
            {makePostingComponents(prevPostings, () => {})}
          </PostingGrid>
        </Grid>
      </ContentGrid>
    </Container>
  );
};

export default ApplicationProfilePage;
