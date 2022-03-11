import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import DropDownMenu from '../../../components/DropdownMenu';
import theme from '../../../theme';
import resumeIcon from '../../../assets/svg/recruitment/application/resume-click.svg';
import backArrowIcon from '../../../assets/svg/recruitment/application/back-arrow.svg';
import {
  blobIcon1,
  blobIcon2,
  blobIcon3,
  blobIcon4,
  blobIcon5,
  blobIcon6,
  blobIcon7,
} from '../../../assets/svg/recruitment/application';

const Container = styled.div`
  margin: 0;
`;

const BackArrow = styled.button`
  background: url(${backArrowIcon});
  color: inherit;
  border: none;
  padding: 5;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: fixed;
  z-index: 2;
  top: 4rem;
  left: 1rem;
  width: 1rem;
  height: 1rem;
  margin: 1rem 0;
`;

const Blob = styled.img`
  position: absolute;
  top: ${({ top }) => top}
  left: ${({ left }) => left}
  width: ${({ width }) => width}
  height: ${({ height }) => height}
`;

const HeaderGrid = styled(Grid)`
  width: 100%;
  position: fixed;
  z-index: 1;
  padding: 64px 82px 10px 82px;
  background: linear-gradient(91.05deg, #cad4ff 0%, #cef6ff 99.9%);
`;

const ContentGrid = styled(Grid)`
  position: relative;
  top: 10rem;
  z-index: 0;
  padding: 64px 82px 10px 82px;
`;

const PostingGrid = styled(Grid)`
  z-index: 0;
`;

const Name = styled.h1`
  font: ${({ theme }) => theme.fonts.bold36};
`;

const Title = styled.h2`
  font: ${({ theme }) => theme.fonts.bold24};
`;

const Subtitle = styled.h2`
  font: ${({ theme }) => theme.fonts.bold18};
`;

const DemographicText = styled.p`
  font: ${({ theme }) => theme.fonts.medium20};
`;

const DemographicLink = styled.a`
  font: ${({ theme }) => theme.fonts.medium20};
  color: ${({ theme }) => theme.colours.blues.blue4};
  text-decoration: none;
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

Ut magna irure eu nostrud irure ad ullamco exercitation sint. Ad irure eu eu Lorem adipisicing. Pariatur laborum irure elit consequat elit. Veniam pariatur do elit irure fugiat velit amet ea. Eu nisi ad veniam id duis officia aute Lorem cupidatat.`,
    currentPostings: ['UI/UX Design', 'Frontend Dev', 'Fullstack Dev'],
    previousPostings: ['UI/UX Design', 'Fullstack Dev'],
  };

  const statuses = {
    app_pending: 'Pending',
    app_reject: 'Rejected',
    app_undecided: 'Undecided',
    interview_setup: 'Interview Set Up',
    interview_pending: 'Interview Pending',
    interview_reject: 'Interview Rejected',
    interview_undecided: 'Interview Undecided',
    final_accept: 'Accepted',
  };

  const postingColours = {
    'UI/UX Design': theme.colours.blues.blue2,
    'Frontend Dev': theme.colours.greens.green1,
    'Fullstack Dev': theme.colours.purples.purple1,
  };

  const handleClick = (e) => {
    console.log(e.target.textContent);
  };

  const handleBackClick = () => {
    history.push('/recruitment/application');
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

  const blobInfo = [
    {
      top: '177.21px;',
      left: '482.13px',
      src: blobIcon1,
      width: '128.48px',
      height: '111.6px',
    },
    {
      top: '142.45px',
      left: '507px',
      src: blobIcon2,
    },
    {
      top: '278.27px',
      left: '898px',
      src: blobIcon3,
    },
    {
      top: '285.29px',
      left: '677px',
      src: blobIcon4,
    },
    {
      top: '168.11px',
      left: '1372.1px',
      src: blobIcon5,
    },
    {
      top: '123.41px',
      left: '1395.09px',
      src: blobIcon6,
    },
    {
      top: '77px',
      left: '1301px',
      src: blobIcon7,
    },
  ];

  const blobs = blobInfo.map(({ src, left, top, width, height }) => (
    <Blob src={src} left={left} top={top} width={width} height={height} />
  ));

  return (
    <Container>
      <BackArrow onClick={() => handleBackClick()} />
      {/* entire page */}
      {/* header takes up 1/4 of the height */}
      {blobs}
      <HeaderGrid item xs={12}>
        <Name>{mockData.name}</Name>
        <DemographicText>
          {mockData.currentPostings.join(' | ')}
        </DemographicText>
      </HeaderGrid>
      {/* application info takes up 3/4 of height */}
      <ContentGrid justifyContent="flex-start" item xs={12} container>
        {/* sidebar takes up 1/3 of width */}
        <Grid item xs={12} md={4}>
          <Title>Demographic</Title>
          <DemographicText>{mockData.demographic.program}</DemographicText>
          <DemographicText>{mockData.demographic.term}</DemographicText>
          <DemographicLink
            target="_blank"
            rel="noreferrer"
            href={mockData.demographic.resumeLink}
          >
            Resume <img alt="click" src={resumeIcon} />
          </DemographicLink>
          <Title>Status</Title>
          <DemographicText>Current Status</DemographicText>
          <DropDownMenu initialStatus={statuses[mockData.status]} />
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
