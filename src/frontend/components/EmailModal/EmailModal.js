import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import UnstyledTextInput from '../TextInput';
import Button from '../Button';
import EmailTemplate from './EmailTemplates.json';
import WaterloopLogo from '../../assets/svg/recruitment/logo-signature.svg';

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 0.9375rem;
  display: flex;
  flex-direction: column;
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
  color: ${({ theme }) => theme.colours.greys.grey3};
`;

const TextMultilineInput = styled(UnstyledTextInput)`
  margin-bottom: 20px;
`;

const TextInput = styled(UnstyledTextInput)`
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Send = styled(Button)`
  background: ${({ theme }) => theme.colours.blues.blue2};
  border-radius: 10.0645px;
`;

const Cancel = styled(Button)`
  background: ${({ theme }) => theme.colours.greys.grey3};
  margin-right: 1rem;
  border-radius: 10.0645px;
  color: white;
  text-decoration: none;
`;

const emailSignatureLogo = {
  width: '150px',
  margin: '15px 0 15px 0',
};

const EmailModal = ({ status, data, onSubmit }) => {
  const {
    applicantEmail,
    /*
    // TODO: Eventually we wanna customize template fields using data below:
    applicantName, 
    execEmail, 
    execName, 
    execPhoneNum, 
    position, 
    subteam, 
    interviewEndDate
    */
  } = data;

  const template = EmailTemplate[status];
  const [toInput, setToInput] = useState(applicantEmail);
  const [subjInput, setSubjInput] = useState(template.subject);
  const bodyRef = useRef();

  return (
    <ModalContainer>
      <WarningMessage>
        Are you sure you want to send this message?
      </WarningMessage>
      <InputGroup>
        <InputLabel>TO: </InputLabel>
        <TextInput paddingLeft="45px" setInput={setToInput}>
          {toInput}
        </TextInput>
      </InputGroup>
      <InputGroup>
        <InputLabel>SUBJECT: </InputLabel>
        <TextInput paddingLeft="90px" setInput={setSubjInput}>
          {subjInput}
        </TextInput>
      </InputGroup>
      <TextMultilineInput multiLine>
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
      <ButtonContainer>
        <Cancel cancel>cancel</Cancel>
        <Send
          tertiary
          onClick={() => {
            if (!onSubmit) {
              return;
            }
            onSubmit({
              to: toInput,
              subject: subjInput,
              body: bodyRef.current.innerHTML,
            });
          }}
        >
          send
        </Send>
      </ButtonContainer>
    </ModalContainer>
  );
};

export default EmailModal;
