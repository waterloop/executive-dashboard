import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

const Container = styled.div`
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor === '' ? theme.colours.white : backgroundColor};
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => padding || '57px'};
  width: ${({ width }) => width};
  height: ${({ height }) => height || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth};

  -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

const CardIcon = styled.img`
  width: ${({ width }) => width || '150px'};
  height: ${({ height }) => height || '150px'};
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  font: ${({ theme, title }) => title || theme.fonts.bold30};
`;

const CardDescription = styled.p`
  font: ${({ theme, font }) => font || theme.fonts.medium24};
  color: ${({ theme, color }) => color || theme.colours.greys.grey2}};
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const LandingCard = ({
  name,
  description,
  to,
  icon,
  alignItems = 'center',
  justifyContent = 'center',
  width = '400px',
  height = '',
  backgroundColor = '',
  maxWidth = 'fit-content',
  cardTitle = '',
  descriptionColor = '',
  descriptionFont = '',
  cardWidth = '',
  cardHeight = '',
  padding = '',
}) => (
  <Container
    width={width}
    height={height}
    maxWidth={maxWidth}
    backgroundColor={backgroundColor}
    padding={padding}
    alignItems={alignItems}
    justifyContent={justifyContent}
  >
    <CardIcon width={cardWidth} height={cardHeight} src={icon} />
    <CardTitle title={cardTitle}>{name}</CardTitle>
    <CardDescription font={descriptionFont} color={descriptionColor}>
      {description}
    </CardDescription>
    <Button tertiary link to={to}>
      View
    </Button>
  </Container>
);

export default LandingCard;
