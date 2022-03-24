import React from 'react';
import styled from 'styled-components';
// import Grid from '@material-ui/core/Grid';

import Button from '../../../components/Button';
// import theme from '../../../theme';

const PlaceholderContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;

  // TODO: remove min-dimension requirements once content is available
  /* min-height: 20rem; */

  -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  position: relative;
`;

const PageTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold36};
`;

const SectionContainer = styled.div`
  background-color: lightgreen;
  margin: 1rem 3rem;
`;

const SectionTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold24};
  text-align: center;
  /* background-color: lightblue; */
`;

const ButtonContainer = styled.div`
  /* position: absolute;
  right: 0;
  bottom: 0; */
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0.5rem 0;
  margin: 2rem;
  background-color: lightcoral;
`;

function ConfigurationPage() {
  return (
    <Container>
      <PageTitle>Configuration</PageTitle>

      <PlaceholderContainer>
        <SectionContainer>
          <SectionTitle>Interviews</SectionTitle>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>New Members Orientation</SectionTitle>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>Member Status Confirmation</SectionTitle>
        </SectionContainer>
        <ButtonContainer>
          <Button label="Cancel" cancel="true" />
          <Button label="Save" tertiary="true" />
        </ButtonContainer>
      </PlaceholderContainer>
    </Container>
  );
}

export default ConfigurationPage;
