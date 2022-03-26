import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';
import DropdownMenu from '../../DropdownMenu';
import resumeIcon from '../../../assets/svg/recruitment/application/resume-click.svg';

const Container = styled.div`
  margin: 0;
`;

const Title = styled.h1`
  font: ${({ theme }) => theme.fonts.bold30};
  padding-bottom: 1rem;
`;

const DemographicText = styled.p`
  font: ${({ theme }) => theme.fonts.medium20};
`;

const DemographicLink = styled.a`
  font: ${({ theme }) => theme.fonts.medium20};
  color: ${({ theme }) => theme.colours.blues.blue4};
  text-decoration: none;
`;

// program is a string
// term is a string
// resumeLink is a string containing a link
// initialStatus is a string representing the initial status to display on the status dropdown menu
const Sidebar = ({ program, term, resumeLink, initialStatus }) => {
  const options = [
    'Pending',
    'Rejected',
    'Undecided',
    'Interview Set Up',
    'Interview Pending',
    'Interview Rejected',
    'Interview Undecided',
    'Accepted',
  ];

  const backgrounds = [
    theme.colours.yellows.yellow1,
    theme.colours.reds.red1,
    theme.colours.greys.grey2,
    theme.colours.blues.blue2,
    theme.colours.yellows.yellow1,
    theme.colours.reds.red1,
    theme.colours.greys.grey2,
    theme.colours.greens.green2,
  ];

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

  return (
    <Container>
      <Title>Demographic</Title>
      <DemographicText>{program}</DemographicText>
      <DemographicText>{term}</DemographicText>
      <DemographicLink target="_blank" rel="noreferrer" href={resumeLink}>
        Resume <img alt="click" src={resumeIcon} />
      </DemographicLink>
      <Title>Status</Title>
      <DemographicText>Current Status</DemographicText>
      <DropdownMenu
        options={options}
        backgrounds={backgrounds}
        initialStatus={statuses[initialStatus]}
      />
    </Container>
  );
};

export default Sidebar;
