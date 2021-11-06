import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;

  cursor: pointer;
`;

const Icon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

const Label = styled.h3`
  font: ${({ theme }) => theme.fonts.bold14};
  text-align: center;
`;

const PagePreview = ({ pageName, icon, onClick, className }) => (
  <Container className={className} onClick={onClick}>
    <Icon src={icon} alt="Page Icon" />
    <Label>{pageName}</Label>
  </Container>
);

export default PagePreview;
