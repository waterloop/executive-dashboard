import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import backArrowIcon from '../../../assets/svg/recruitment/application/back-arrow.svg';

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

const HeaderGrid = styled(Grid)`
  width: 100%;
  position: fixed;
  z-index: 1;
  padding: 64px 82px 10px 82px;
  background-color: #a3f4e4;
  background-image: ${({ blobs }) => `url(${blobs})`},
    linear-gradient(91.05deg, #cad4ff 0%, #cef6ff 99.9%);
  background-size: cover;
  background-position: center;
`;

const Name = styled.h1`
  font: ${({ theme }) => theme.fonts.bold36};
`;

const DemographicText = styled.p`
  font: ${({ theme }) => theme.fonts.medium20};
`;

// name is a string, current postings is an array of strings containing names of postings, blobs is the file path to an svg
const Header = ({ name, currentPostings, blobs }) => {
  const history = useHistory();

  const handleBackClick = () => {
    history.push('/recruitment/application');
  };

  return (
    <Container>
      <BackArrow onClick={() => handleBackClick()} />
      <HeaderGrid item xs={12} blobs={blobs}>
        <Name>{name}</Name>
        <DemographicText>{currentPostings.join(' | ')}</DemographicText>
      </HeaderGrid>
    </Container>
  );
};

export default Header;
