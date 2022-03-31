import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Container = styled.div`
  width: 100%;
`;

const TextInputContainer = styled.input`
  height: 47px;
  width: 100%;
  background-color: ${({ theme }) => theme.colours.white};
  font: ${({ theme }) => theme.fonts.medium14};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: 16px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid #c4c4c4;
  box-shadow: 0px 4px 10px #e0e5f3;
  border-radius: 15px;
`;

const ContentEditableContainer = styled.div`
  white-space: pre-wrap;
  overflow: scroll;
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.colours.white};
  font: ${({ theme }) => theme.fonts.medium14};

  justify-content: space-between;
  padding: 16px;

  border: 1px solid #c4c4c4;
  box-shadow: 0px 4px 10px #e0e5f3;
  border-radius: 15px;

  ${
    '' /* ::placeholder,
  ::-webkit-input-placeholder {
    font: ${({ theme }) => theme.fonts.medium18};
    color: ${({ theme }) => theme.colours.greys.grey2};
  } */
  }
`;

const emailSignatureLogo = {
  width: '150px',
  margin: '15px 0 15px 0',
};

const TextInput = ({
  className /* Allows for external styles to be applied to the component
                using the styled components library
                className prop needs to be passed to the parent JSX element */,
  multiLine,
  rows = 10,
  paddingLeft,
  initialValue,
  width,
  hasImage,
  imgURL = '',
  textAfterImg = '',
}) => {
  const [input, setName] = useState(initialValue);
  return (
    <Container width={width} className={className}>
      {multiLine ? (
        <ContentEditableContainer
          contentEditable="true"
          rows={rows}
          paddingLeft={paddingLeft}
          onChange={(e) => setName(e.target.value)}
        >
          {' '}
          {input}{' '}
          {hasImage ? (
            <img src={imgURL} alt="Waterloop Logo" style={emailSignatureLogo} />
          ) : (
            ''
          )}
          {textAfterImg}
        </ContentEditableContainer>
      ) : (
        <TextInputContainer
          paddingLeft={paddingLeft}
          value={input}
          onChange={(e) => setName(e.target.value)}
        />
      )}
    </Container>
  );
};

export default TextInput;
