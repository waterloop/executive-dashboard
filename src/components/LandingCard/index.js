import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colours.white};;  

  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 15px;

  -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 57px;
  padding-right: calc(min(68px, 20%));
  padding-left: calc(min(68px, 20%));
  width: 400px;
`;

const CardIcon = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold30};
`;

const CardDescription = styled.p`
  font: ${({ theme }) => theme.fonts.medium24};
  color: ${({ theme }) => theme.colours.greys.grey2};
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const LandingCard = ({ name, description, to, icon }) => (
  <Container>
    <CardIcon src={icon} />
    <CardTitle>{name}</CardTitle>
    <CardDescription>{description}</CardDescription>
    <Button tertiary link to={to}>
      View
    </Button>
  </Container>
);

export default LandingCard;
