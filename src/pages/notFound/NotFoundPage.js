import React from 'react';
import styled from 'styled-components';

import NotFoundSVG from './assets/not-found.svg';

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundHeaderSmall = styled.h3`
  font: ${({ theme }) => theme.fonts.medium72};
  margin: 0;
`;

const NotFoundHeaderBig = styled.h1`
  font: ${({ theme }) => theme.fonts.bold250};
  margin: 0;
`;

const NotFoundParagraph = styled.p`
  font: ${({ theme }) => theme.fonts.medium24};
  text-align: center;
`;

const NotFoundImage = styled.img.attrs({
  src: NotFoundSVG,
})``;

const NotFoundPage = () => (
  <Container>
    <TextContainer>
      <NotFoundHeaderSmall>ERROR</NotFoundHeaderSmall>
      <NotFoundHeaderBig>404</NotFoundHeaderBig>
      <NotFoundParagraph>
        Oops! The page you are looking for was not found.
      </NotFoundParagraph>
    </TextContainer>
    <NotFoundImage />
  </Container>
);

export default NotFoundPage;
