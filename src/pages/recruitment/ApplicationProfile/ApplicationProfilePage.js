import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import blobs from '../../../assets/svg/recruitment/application/blobs.svg';

import Header from '../../../components/ProfileTemplate/Header';
import Sidebar from '../../../components/ProfileTemplate/Sidebar';
import useApplications from '../../../hooks/applications';

import { mockData } from '../../../tests/recruitment/application-profile/mocks';

import {
  options,
  backgrounds,
  statuses,
  interviewStatuses,
  postingColours,
} from './Constants';

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

const options = ['Pending', 'To interview', 'To reject', 'Undecided']; // TODO: Tie with taboptions

const backgrounds = [
  theme.colours.yellows.yellow1,
  theme.colours.blues.blue2,
  theme.colours.reds.red1,
  theme.colours.greys.grey2,
];

const statuses = {
  app_pending: 'Pending',
  app_reject: 'To reject',
  interview_pending: 'To interview',
  app_undecided: 'Undecided',
};

const postingColours = [
  theme.colours.blues.blue2,
  theme.colours.greens.green1,
  theme.colours.purples.purple1,
];

// Functions:
const makeProfileData = (app) =>
  app
    ? {
        fullName: `${app.first_name} ${app.last_name}`,
        program: app.program,
        term: `${app.current_year} ${app.in_school ? 'Study' : 'Co-op'}`,
        resumeLink: app.resume_link,
        status: app.status,
        reasonToJoin: app.reason_to_join || '(none provided)',
        additionalInfo: app.additional_info || '(none provided)',
      }
    : {};

const ApplicationProfilePage = () => {
  // TODO: redirect user to 404 page if application not found. Use useHistory hook
  const match = useRouteMatch('/recruitment/application/:id');
  const { applications } = useApplications('FALL-2022'); // TODO: in production, replace with Date.now().
  const application = applications.find(
    (app) => `${app.id}` === match.params.id,
  );

  const profileData = makeProfileData(application);

  const handleClick = (e) => {
    console.log(e.target);
  };

  const postingGenerator = (postings) =>
    postings.map((posting, index) => (
      <PostingContainer key={posting} item>
        <PostingBubble colour={postingColours[index % postingColours.length]}>
          <ApplicationText>
            <PostingButton onClick={(e) => handleClick(e)}>
              {posting}
            </PostingButton>
          </ApplicationText>
        </PostingBubble>
      </PostingContainer>
    ));

  const currPostings = postingGenerator(mockData.currentPostings);

  const prevPostings = postingGenerator(mockData.previousPostings);

  return (
    <Container>
      <Header
        name={profileData.fullName}
        currentPostings={mockData.currentPostings}
        blobs={blobs}
        background="linear-gradient(91.05deg, #CAD4FF 0%, #CEF6FF 99.9%)"
      />
      {/* application info takes up 3/4 of height */}
      <ContentGrid justifyContent="flex-start" item xs={12} container>
        {/* sidebar takes up 1/3 of width */}
        <Grid item xs={12} md={4}>
          <Sidebar
            program={profileData.program}
            term={profileData.term}
            resumeLink={profileData.resumeLink}
            initialStatus={profileData.status}
            options={options}
            backgrounds={backgrounds}
            statuses={statuses}
            locked={locked(mockData.status)}
            errorMessage="Please change in interview profile!"
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
            {currPostings}
          </PostingGrid>
          <Subtitle>Previous Postings</Subtitle>
          <PostingGrid container spacing={1}>
            {prevPostings}
          </PostingGrid>
        </Grid>
      </ContentGrid>
    </Container>
  );
};

export default ApplicationProfilePage;
