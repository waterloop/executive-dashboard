import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import DropDownMenu from '../../../components/DropdownMenu';
import theme from '../../../theme';

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
`;

const HeaderGrid = styled(Grid)`
  padding-left: 40px;
  height: 25%;
`;

const Name = styled.h1`
  font: ${({ theme }) => theme.fonts.bold36};
`;

const PostingBubble = styled(Grid)`
  display: inline;
  border-radius: 17.5px;
  height: 40px;
  background-color: ${(props) => props.colour};
`;

const ApplicationProfilePage = () => {
  const mockData = {
    name: 'John Smith',
    demographic: {
      term: '1A Co-op',
      program: 'Mechatronics Eng',
      resumeLink:
        'https://cdn-images.zety.com/templates/zety/valera-11-classic-silver-dark-332@3x.png',
    },
    status: 'final_accept',
    why: 'Lorem ipsum',
    additionalInfo: 'Lorem ipsum',
    currentPostings: ['UI/UX Design', 'Fullstack Dev'],
  };

  const statuses = {
    app_pending: 'Pending',
    app_reject: 'Rejected',
    app_undecided: 'Undecided',
    interview_setup: 'Interview Set Up',
    interview_pending: 'Pending',
    interview_reject: 'Rejected',
    interview_undecided: 'Undecided',
    final_accept: 'Accepted',
  };

  const postingColours = {
    'UI/UX Design': theme.colours.blues.blue2,
    'Frontend Dev': theme.colours.greens.green1,
    'Fullstack Dev': theme.colours.purples.purple1,
  };

  const postings = mockData.currentPostings.map((posting) => (
    <PostingBubble item colour={postingColours[posting]}>
      {posting}
    </PostingBubble>
  ));

  return (
    <Container>
      {/* entire page */}
      <Grid container spacing={2}>
        {/* header takes up 1/4 of the height */}
        <HeaderGrid justifyContent="flex-start" item xs={12}>
          <Name>{mockData.name}</Name>
          <p>{mockData.currentPostings.join(' | ')}</p>
        </HeaderGrid>

        {/* application info takes up 3/4 of height */}
        <Grid justifyContent="flex-start" item xs={12} container>
          {/* sidebar takes up 1/3 of width */}
          <Grid item xs={4}>
            <h2>Demographic</h2>
            <h2>Status</h2>
            <p>Current Status</p>
            <DropDownMenu initialStatus={statuses[mockData.status]} />
          </Grid>
          {/* main content takes up 2/3 of width */}
          <Grid item xs={8}>
            <p>Main content</p>
            <Grid container spacing={3}>
              {postings}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApplicationProfilePage;
