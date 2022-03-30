import React from 'react';
import styled from 'styled-components';
import DropdownMenu from '../../DropdownMenu';
import resumeIcon from '../../../assets/svg/recruitment/resume-click.svg';

const Container = styled.div`
  margin: 0;
`;

const DemographicContainer = styled.div`
  padding-bottom: 1.5rem;
`;

const Title = styled.h1`
  font: ${({ theme }) => theme.fonts.bold30};
  padding-bottom: 0.5rem;
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
// options is an array of strings for each status option display text
// backgrounds is an optional array of colours for each option's display background
// statuses is a json mapping of status codes to status text
// locked is a boolean indicating if the status is mutable or not (e.g. if the status is locked in application profile because it's in interview stage)
const Sidebar = ({
  program,
  term,
  resumeLink,
  initialStatus,
  options,
  backgrounds,
  statuses,
  locked,
}) => (
  <Container>
    <DemographicContainer>
      <Title>Demographic</Title>
      <DemographicText>{program}</DemographicText>
      <DemographicText>{term}</DemographicText>
      <DemographicLink target="_blank" rel="noreferrer" href={resumeLink}>
        Resume <img alt="click" src={resumeIcon} />
      </DemographicLink>
    </DemographicContainer>
    <DemographicContainer>
      <Title>Status</Title>
      <DemographicText>Current Status</DemographicText>
      <DropdownMenu
        options={options}
        backgrounds={backgrounds || undefined}
        initialStatus={statuses[initialStatus]}
        locked={locked}
      />
    </DemographicContainer>
  </Container>
);

export default Sidebar;
