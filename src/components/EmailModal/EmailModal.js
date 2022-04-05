import React, { useRef } from 'react';
import styled from 'styled-components';

import UnstyledTextInput from '../TextInput';
import Button from '../Button';
import EmailTemplate from './EmailTemplate.json';
import WaterloopLogo from '../../assets/svg/recruitment/logo-signature.svg';

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

const emailSignatureLogo = {
  width: '150px',
  margin: '15px 0 15px 0',
};

const EmailModal = ({ status, subject }) => {
  const bodyRef = useRef();

  const template = EmailTemplate.find((item) => item.status === status);

  return (
    <ModalContainer>
      <WarningMessage>
        Are you sure you want to send this message?
      </WarningMessage>
      <InputGroup>
        <InputLabel>TO: </InputLabel>
        <TextInput paddingLeft="45px">Autofill EMAIL</TextInput>
      </InputGroup>
      <InputGroup>
        <InputLabel>SUBJECT: </InputLabel>
        <TextInput paddingLeft="90px">{template.subject}</TextInput>
      </InputGroup>
      <TextMultilineInput multiLine subjectLine={subject}>
        {/* NOTE: ref doesn't work with styled-components, so we have to define an extra div here. */}
        <div ref={bodyRef}>
          {template.text}
          <img
            src={WaterloopLogo}
            alt="Waterloop Logo"
            style={emailSignatureLogo}
          />
          {template.textAfterImg}
        </div>
      </TextMultilineInput>
      <Cancel cancel>cancel</Cancel>
      <Send
        tertiary
        onClick={() => {
          console.log(bodyRef.current.innerHTML);
        }}
      >
        send
      </Send>
    </ModalContainer>
  );
};

export default EmailModal;
