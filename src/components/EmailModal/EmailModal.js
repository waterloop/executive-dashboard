import React from 'react';
import styled from 'styled-components';

import UnstyledTextInput from '../TextInput';
import Button from '../Button';
import EmailTemplate from './EmailTemplate.json';

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 0.9375rem;
  height: auto;
  padding: 40px 40px 60px 40px;
  margin-top: 30px;
`;

const WarningMessage = styled.p`
    font: ${({ theme }) => theme.fonts.medium16};
    font-weight: bold;
    color: ${({ theme }) => theme.colours.blacks.black3}};
    text-align: center;
    margin-bottom: 30px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.p`
  position: absolute;
  left: 16px;
  font: ${({ theme }) => theme.fonts.medium14};
  font-weight: bold;
  color: #878787;
`;

const TextMultilineInput = styled(UnstyledTextInput)`
  margin-bottom: 20px;
`;

const TextInput = styled(UnstyledTextInput)`
  margin-bottom: 10px;
`;

const Send = styled(Button)`
  position: absolute;
  right: 125px;
  background: #82b0fd;
  border-radius: 10.0645px;
`;

const Cancel = styled(Button)`
  position: absolute;
  right: 220px;
  background: #afafaf;
  border-radius: 10.0645px;
  color: white;
  text-decoration: none;
`;

const EmailModal = ({ status, subject }) => (
  <ModalContainer>
    <WarningMessage>Are you sure you want to send this message?</WarningMessage>
    <InputGroup>
      <InputLabel>TO: </InputLabel>
      <TextInput paddingLeft="45px" initialValue="Autofill EMAIL" />
    </InputGroup>
    <InputGroup>
      <InputLabel>SUBJECT: </InputLabel>
      <TextInput paddingLeft="90px" initialValue={EmailTemplate.filter((item) => item.status === status)[0].subject} />
    </InputGroup>
    <TextMultilineInput
      multiLine
      subjectLine = {subject}
      initialValue={
        EmailTemplate.filter((item) => item.status === status)[0].text
      }
    />
    <Cancel cancel>cancel</Cancel>
    <Send tertiary>send</Send>
  </ModalContainer>
);

export default EmailModal;
