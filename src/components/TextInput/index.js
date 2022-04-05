import React, { useState } from 'react';
import styled from 'styled-components';

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
`;

const TextInput = ({
  className /* Allows for external styles to be applied to the component
                using the styled components library
                className prop needs to be passed to the parent JSX element */,
  multiLine,
  rows = 10,
  paddingLeft,
  children,
  width,
}) => {
  const [input, setInput] = useState(children);
  return (
    <Container width={width} className={className}>
      {multiLine ? (
        <ContentEditableContainer
          contentEditable="true"
          rows={rows}
          paddingLeft={paddingLeft}
        >
          {input}
        </ContentEditableContainer>
      ) : (
        <TextInputContainer
          paddingLeft={paddingLeft}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      )}
    </Container>
  );
};

export default TextInput;
