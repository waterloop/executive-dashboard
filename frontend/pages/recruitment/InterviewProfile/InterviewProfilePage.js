import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import blobs from '../../../assets/svg/recruitment/interview/blobs.svg';

import Header from '../../../components/ProfileTemplate/Header';
import Sidebar from '../../../components/ProfileTemplate/Sidebar';

import useApplications from '../../../hooks/applications';
import useInterviewByAppId from '../../../hooks/interviewByAppId';

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
  border: ${({ theme }) => theme.borders.solidBlack};
  border-radius: 6px;
  position: relative;
  width: 80%;
  height: 200px;
  padding: 10px;
  font: ${({ theme }) => theme.fonts.medium18};
`;

const SaveNoteHintContainer = styled.div`
  min-height: 1rem;
`;

const SaveNoteHint = styled.p`
  margin: 0;
  font: ${({ theme }) => theme.fonts.bold16};
  color: ${({ theme }) => theme.colours.greys.grey3};

  /* code from https://codepen.io/vkjgr/pen/gbPaVx */
  &.loading:after {
    content: ' .';
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      color: rgba(0, 0, 0, 0);
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    40% {
      color: ${({ theme }) => theme.colours.greys.grey3};
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    60% {
      text-shadow: 0.25em 0 0 ${({ theme }) => theme.colours.greys.grey3},
        0.5em 0 0 rgba(0, 0, 0, 0);
    }
    80%,
    100% {
      text-shadow: 0.25em 0 0 ${({ theme }) => theme.colours.greys.grey3},
        0.5em 0 0 ${({ theme }) => theme.colours.greys.grey3};
    }
  }
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

  const application = applications.find(
    (app) => `${app.id}` === match.params.id,
  );

  const { interview, updateInterviewNote } = useInterviewByAppId(
    match.params.id,
  );

  const [note, setNote] = useState();

  // Needed since interview may be undefined initially.
  useEffect(() => {
    if (interview) {
      setNote(interview.note);
    }
  }, [interview]);

  const [savingTOID, setSavingTOID] = useState(undefined);

  const handleNoteChange = (newNote) => {
    setNote(newNote);
    // Pair interview note change saves to a timer so we're not sending
    // POST requests every update.
    if (savingTOID) {
      clearTimeout(savingTOID);
    }
    setSavingTOID(
      setTimeout(
        (note) => {
          if (updateInterviewNote(match.params.id, note)) {
            console.log(`${note} saved!`);
            setSavingTOID(0);
          } else {
            // // error state:
            // setSavingTOID(-1)
          }
        },
        4000,
        newNote,
      ),
    );
  };

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
                : 'interview_pending'
            }
            updateStatus={updateAppStatusCurried(profileData.id)}
          />
        </Grid>
        {/* main content takes up 2/3 of width */}
        <Grid item xs={12} md={8}>
          <InterviewContainer item xs={12}>
            <Title>Interview Notes</Title>
            <TextArea
              placeholder="(please enter interview notes here)"
              value={note}
              onChange={(e) => {
                handleNoteChange(e.target.value);
              }}
            />
            <SaveNoteHintContainer>
              {!!savingTOID && savingTOID !== 0 && (
                <SaveNoteHint className="loading">Saving</SaveNoteHint>
              )}
              {savingTOID === 0 && (
                <SaveNoteHint>Note saved successfully!</SaveNoteHint>
              )}
            </SaveNoteHintContainer>
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
