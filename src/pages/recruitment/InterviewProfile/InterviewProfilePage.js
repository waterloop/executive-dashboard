import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import blobs from '../../../assets/svg/recruitment/interview/blobs.svg';

import { options, backgrounds, statuses } from './Constants';

import Header from '../../../components/ProfileTemplate/Header';
import Sidebar from '../../../components/ProfileTemplate/Sidebar';

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

const InterviewProfilePage = () => {
  const mockData = {
    name: 'John Smith',
    demographic: {
      term: '1A Co-op',
      program: 'Mechatronics Eng',
      resumeLink:
        'https://cdn-images.zety.com/templates/zety/valera-11-classic-silver-dark-332@3x.png',
    },
    status: 'interview_undecided',
  };

  return (
    <Container>
      <Header
        name={mockData.name}
        blobs={blobs}
        background="linear-gradient(91.05deg, #CAD4FF 0%, #FEEDED 99.9%)"
      />
      {/* application info takes up 3/4 of height */}
      <ContentGrid justifyContent="flex-start" item xs={12} container>
        {/* sidebar takes up 1/3 of width */}
        <Grid item xs={12} md={4}>
          <Sidebar
            program={mockData.demographic.program}
            term={mockData.demographic.term}
            resumeLink={mockData.demographic.resumeLink}
            initialStatus={mockData.status}
            options={options}
            backgrounds={backgrounds}
            statuses={statuses}
          />
        </Grid>
        {/* main content takes up 2/3 of width */}
        <Grid item xs={12} md={8}>
          <InterviewContainer item xs={12}>
            <Title>Interview Notes</Title>
            <TextArea placeholder="Text" />
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
