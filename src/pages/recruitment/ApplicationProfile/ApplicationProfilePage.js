import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import theme from '../../../theme';
import blobs from '../../../assets/svg/recruitment/application/blobs.svg';

import Header from '../../../components/ProfileTemplate/Header';
import Sidebar from '../../../components/ProfileTemplate/Sidebar';

const Container = styled.div`
  margin: 0;
`;

const ContentGrid = styled(Grid)`
  position: relative;
  top: 11rem;
  z-index: 0;
  padding: 64px 82px 10px 82px;
`;

const PostingGrid = styled(Grid)`
  z-index: 0;
`;

const Title = styled.h2`
  font: ${({ theme }) => theme.fonts.bold24};
`;

const Subtitle = styled.h2`
  font: ${({ theme }) => theme.fonts.bold18};
`;

const ApplicationText = styled.p`
  font: ${({ theme }) => theme.fonts.medium16};
  margin: 0;
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

const ApplicationProfilePage = () => {
  const history = useHistory();

  const mockData = {
    name: 'John Smith',
    demographic: {
      term: '1A Co-op',
      program: 'Mechatronics Eng',
      resumeLink:
        'https://cdn-images.zety.com/templates/zety/valera-11-classic-silver-dark-332@3x.png',
    },
    status: 'final_accept',
    why: `Fugiat ad anim laborum et ipsum qui consequat irure. Ipsum ad labore anim ad ipsum do quis fugiat ad commodo ullamco adipisicing. Voluptate anim exercitation do magna minim duis sit laboris sint amet enim laboris. Proident aute labore cillum cillum occaecat est ad labore. Irure nisi proident cillum eiusmod do ut do aute duis laborum occaecat do voluptate.

upidatat deserunt ex in in irure consequat. Incididunt aliqua cillum ea mollit culpa in quis sit ad dolor occaecat nulla do.

Voluptate eiusmod duis veniam ipsum est qui officia voluptate quis. Eu proident tempor dolore reprehenderit amet et aute esse Lorem dolor aliquip. Laboris consectetur laborum mollit proident aliqua anim ad occaecat aute excepteur cillum aliqua. Ut aliqua esse mollit cillum nisi in deserunt labore do excepteur excepteur ex.`,
    additionalInfo: `Adipisicing Lorem sint commodo ad nisi velit irure. Veniam eiusmod tempor do sunt ipsum ullamco amet nisi consectetur ut aute. Do tempor dolore ex ullamco irure non officia magna ipsum irure laboris minim. Adipisicing mollit enim enim aliquip magna ullamco aliquip nisi duis velit laboris.

Do est cillum laborum commodo proident magna do ullamco aliquip quis aliqua dolor proident. Voluptate ipsum excepteur velit ullamco commodo voluptate ex ad dolore qui enim. Duis eu proident anim fugiat Lorem reprehenderit dolore officia incididunt in. Aute sit nostrud cillum labore eu irure sit ea id dolor deserunt. Magna et consectetur est incididunt aliquip ullamco sunt non proident consequat ea proident aliqua qui.

Ut magna irure eu nostrud irure ad ullamco exercitation sint. Ad irure eu eu Lorem adipisicing. Pariatur laborum irure elit consequat elit. Veniam pariatur do elit irure fugiat velit amet ea. Eu nisi ad veniam id duis officia aute Lorem cupidatat.
Laborum excepteur labore reprehenderit aute aliqua veniam. Ipsum qui irure voluptate do fugiat Lorem minim cupidatat irure quis pariatur labore elit eu. Ut eiusmod aliqua nisi in sint deserunt sint proident excepteur esse magna. Do laborum qui consequat laborum Lorem ipsum cillum ullamco Lorem mollit esse et enim. Occaecat qui quis aute proident reprehenderit ut sit commodo et sit dolor fugiat occaecat.

Nisi cupidatat ut culpa eiusmod magna dolor et. Anim eiusmod minim in nostrud tempor. Ullamco sit ullamco adipisicing dolor exercitation mollit consequat sunt laborum nisi magna est aute. Officia aliqua commodo sint reprehenderit non ipsum.

Ea pariatur dolore ad anim non ea pariatur reprehenderit in laborum est duis. Consectetur amet duis veniam qui voluptate aliquip do dolore. Sit aliquip nostrud minim reprehenderit commodo ut labore velit cupidatat dolor nulla. Pariatur esse ut mollit esse. Id deserunt aliqua Lorem dolore veniam fugiat aute laboris occaecat culpa Lorem eiusmod. Anim cillum voluptate irure aliqua aliqua qui sint elit.

Reprehenderit eiusmod occaecat ipsum deserunt. Officia non mollit quis eiusmod voluptate tempor occaecat. Nisi non eiusmod occaecat veniam ea ea aute sunt pariatur esse culpa duis.

Exercitation esse anim minim ad commodo sunt deserunt aute nulla. Anim nisi qui id deserunt non dolore esse consequat in officia in consectetur. Non eu in culpa enim amet. Excepteur consectetur magna incididunt culpa culpa laboris enim velit duis aute. Tempor minim reprehenderit sint nisi eu.

Irure dolor culpa duis et amet anim Lorem enim aliquip quis. Est quis excepteur ullamco ipsum laboris ea pariatur reprehenderit. Proident et qui culpa ipsum deserunt consectetur culpa magna aliquip esse.

Pariatur ea anim nulla aute aliqua quis do adipisicing. Sit incididunt cupidatat consequat reprehenderit aliquip deserunt exercitation do sunt non anim ullamco. Cupidatat elit eu id ipsum est.

Anim officia officia sint ea. Enim occaecat elit elit tempor irure veniam in labore Lorem reprehenderit consectetur pariatur. Commodo laboris exercitation reprehenderit aliquip reprehenderit aliquip mollit esse. Duis aute dolor id amet sint commodo ut occaecat cupidatat.

Excepteur minim deserunt quis laborum do eu. Ullamco commodo laboris do commodo ut occaecat aute. Lorem consequat elit duis cupidatat aute qui eiusmod amet aliqua ullamco veniam minim. Veniam duis eu ex id id laborum officia non ex consectetur ipsum.

Id reprehenderit ad mollit mollit. Consequat in et occaecat dolor aliquip esse adipisicing. Excepteur consequat consequat occaecat commodo sunt elit anim reprehenderit irure labore. Qui non nostrud magna cillum adipisicing in in. Amet ad pariatur officia laboris irure sit.`,
    currentPostings: ['UI/UX Design', 'Frontend Dev', 'Fullstack Dev'],
    previousPostings: ['UI/UX Design', 'Fullstack Dev'],
  };

  const postingColours = {
    'UI/UX Design': theme.colours.blues.blue2,
    'Frontend Dev': theme.colours.greens.green1,
    'Fullstack Dev': theme.colours.purples.purple1,
  };

  const handleClick = (e) => {
    console.log(e.target.textContent);
  };

  const postingGenerator = (postings) =>
    postings.map((posting) => (
      <PostingContainer item>
        <PostingBubble key={posting} colour={postingColours[posting]}>
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
        name={mockData.name}
        currentPostings={mockData.currentPostings}
        blobs={blobs}
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
          />
        </Grid>
        {/* main content takes up 2/3 of width */}
        <Grid item xs={12} md={8}>
          <Title>Application</Title>
          <Subtitle>Why do you want to join the team?</Subtitle>
          <ApplicationText>{mockData.why}</ApplicationText>
          <Subtitle>Additional Information</Subtitle>
          <ApplicationText>{mockData.additionalInfo}</ApplicationText>
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
