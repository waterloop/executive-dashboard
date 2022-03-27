import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

const CardContainer = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;

  max-width: 13rem;
  padding: 3rem 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 0.9375rem;
  -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};

  transition: box-shadow 250ms;

  &:hover {
    -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow2};
    -moz-box-shadow: ${({ theme }) => theme.shadows.shadow2};
    box-shadow: ${({ theme }) => theme.shadows.shadow2};
  }
`;

// Needed to stretch card contents to grid height.
const CardGrid = styled(Grid)`
  display: flex;
`;

const CardTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold24};
  text-align: center;
`;

const CardIcon = styled.img`
  width: 6rem;
  height: 6rem;
  margin: 1rem 0;
`;

const CardDescription = styled.p`
  font: ${({ theme }) => theme.fonts.medium14};
  color: ${({ theme }) => theme.colours.greys.grey3}};
  text-align: center;
`;

const RecruitmentCard = (props) => {
  const history = useHistory();
  const { to, name, icon, description } = props;

  return (
    <CardGrid item>
      <CardContainer {...props} onClick={() => history.push(to)}>
        <CardIcon src={icon} />
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContainer>
    </CardGrid>
  );
};

export default RecruitmentCard;
