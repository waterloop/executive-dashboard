import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';

import UnstyledTextInput from '../TextInput';
import Button from '../Button';
import EmailTemplate from './EmailTemplate';
import WaterloopLogo from '../../assets/svg/recruitment/logo-signature.svg';

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 40px 40px 60px 40px;
  width: 70%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const EmailModal = ({ status, data, onSubmit, open, handleClose }) => {
  const { applicantEmail, execEmail, execPhoneNum } = data;

  const [toInput, setToInput] = useState('');
  const [subjInput, setSubjInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');

  useEffect(() => {
    setToInput(applicantEmail);
  }, [data]);

  useEffect(() => {
    const { subject, text } = EmailTemplate(status, data);
    setSubjInput(subject);
    setBodyInput(text);
  }, [status, data]);

  const execContact = `\n${execEmail} | ${execPhoneNum}`;

  return (
    <Modal open={open} handleClose={handleClose}>
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
        <TextMultilineInput multiLine setInput={setBodyInput}>
          {bodyInput}
          <img
            src={WaterloopLogo}
            alt="Waterloop Logo"
            style={emailSignatureLogo}
          />
          {execContact}
        </TextMultilineInput>
        <ButtonContainer>
          <Cancel cancel onClick={() => handleClose()}>
            Cancel
          </Cancel>
          <Send
            tertiary
            onClick={() => {
              if (!onSubmit) {
                return;
              }
              onSubmit({
                to: toInput,
                subject: subjInput,
                body: bodyInput,
              });
            }}
          >
            Send
          </Send>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default EmailModal;
