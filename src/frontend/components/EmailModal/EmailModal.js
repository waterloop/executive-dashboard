import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';

import UnstyledTextInput from '../TextInput';
import Button from '../Button';
import EmailTemplate from './EmailTemplate';

// TODO: send waterloop logo SVG through email,
// will require either attaching as part of email (then referencing) or uploading to gdrive and embedding link into img src directly.
// see https://community.nodemailer.com/using-embedded-images/
// import LogoSignature from '../../assets/LogoSignature';

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

const EmailModal = ({ status, data, onSubmit, open, handleClose }) => {
  const { applicantEmail, execEmail, execName, subteam } = data;

  const [toInput, setToInput] = useState('');
  const [subjInput, setSubjInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');

  useEffect(() => {
    setToInput(applicantEmail);
  }, [applicantEmail]);

  useEffect(() => {
    const { subject, text } = EmailTemplate(status, data);
    setSubjInput(subject);
    setBodyInput(
      `${text}<br /><br />${execName}<br />${subteam} Team Lead<br />Waterloop<br /><a href="mailto:${execEmail}">${execEmail}</a>`,
    );
  }, [status, data]);

  return (
    <Modal open={open} onClose={handleClose}>
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
          <div
            dangerouslySetInnerHTML={{
              __html: bodyInput,
            }}
          />
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
