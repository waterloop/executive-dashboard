import React, { useEffect, useState } from 'react';
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
// backgrounds is an optional array of colours for each option's display background
// statuses is a json mapping of status codes to status text
// locked is a boolean indicating if the status is mutable or not (e.g. if the status is locked in application profile because it's in interview stage)
// errorMessage is an optional string error message to display when someone clicks a locked menu
const Sidebar = ({
  program,
  term,
  resumeLink,
  backgrounds,
  statuses,
  locked,
  errorMessage,
  initialStatus,
  updateStatus,
  emailSent,
}) => {
  // Uses status ID instead of status name, e.g. app_pending
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    setCurrentStatus(initialStatus);
  }, [initialStatus]);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    updateStatus(newStatus);
  };
  return (
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
          current={currentStatus}
          options={statuses}
          backgrounds={backgrounds || undefined}
          setCurrent={handleStatusChange}
          locked={locked}
          errorMessage={errorMessage}
          emailSent={emailSent}
        />
      </DemographicContainer>
    </Container>
  );
};

export default Sidebar;

