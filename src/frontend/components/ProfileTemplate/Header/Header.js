import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import backArrowIcon from '../../../assets/svg/recruitment/back-arrow.svg';

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
  position: absolute;
  z-index: 2;
  top: 5rem;
  left: 1rem;
  width: 1rem;
  height: 1rem;
  margin: 1rem 0;
`;

const HeaderGrid = styled(Grid)`
  width: 100%;
  position: relative;
  overflow: auto;
  z-index: 1;
  padding: 64px 82px 10px 82px;
  background-color: #a3f4e4;
  background-image: ${({ blobs }) => `url(${blobs})`},
    ${({ background }) => background};
  background-size: cover;
  background-position: center;
`;

const Name = styled.h1`
  font: ${({ theme }) => theme.fonts.bold48};
`;

const DemographicText = styled.p`
  font: ${({ theme }) => theme.fonts.medium20};
`;

// name is a string, current postings is an array of strings containing names of postings, blobs is the file path to an svg
const Header = ({
  name,
  currentPostings,
  background,
  blobs,
  handleBackClick,
}) => (
  <Container>
    <BackArrow onClick={() => handleBackClick()} />
    <HeaderGrid item xs={12} background={background} blobs={blobs}>
      <Name>{name}</Name>
      {currentPostings && currentPostings.length > 0 && (
        <DemographicText>{currentPostings.join(' | ')}</DemographicText>
      )}
    </HeaderGrid>
  </Container>
);

export default Header;
