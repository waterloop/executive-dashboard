import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 0.9375rem;

  width: 20rem;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: auto;
  padding: 3rem;

  -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

const CardIcon = styled.img`
  width: 9.375rem;
  height: 9.375rem;
  margin-bottom: 1.25rem;
`;

const CardTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold30};
`;

const CardDescription = styled.p`
  font: ${({ theme }) => theme.fonts.medium24};
  color: ${({ theme }) => theme.colours.greys.grey2}};
  text-align: center;
  margin-top: 1.25rem;
  margin-bottom: 2.5rem;
`;

const LandingCard = ({ name, description, to, icon }) => (
  <CardContainer>
    <CardIcon src={icon} />
    <CardTitle>{name}</CardTitle>
    <CardDescription>{description}</CardDescription>
    <Button tertiary link to={to}>
      View
    </Button>
  </CardContainer>
);

export default LandingCard;
