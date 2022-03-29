import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Container = styled.div`
  width: 100%;
`;

// TODO: Only change to red when user clicks away from the text box.
const TextInputContainer = styled.input`
  height: 47px;
  width: 100%;
  background-color: ${({ theme }) => theme.colours.white};
  font: ${({ theme }) => theme.fonts.medium14};
  padding-left: ${props => (props.paddingLeft)};
  padding-right: 16px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid #c4c4c4;
  box-shadow: 0px 4px 10px #e0e5f3;
  border-radius: 15px;
`;

const TextAreaContainer = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  min-height: 300px;
  background-color: ${({ theme }) => theme.colours.white};
  font: ${({ theme }) => theme.fonts.medium14};
  resize: none;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;

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

/* 
To implement the richText support in textinput:
- need to set richText to true for the textinput component,
- import getRichText and submitRichText (from rich text utils) into respective hook for first getting the info from database and saving it 
https://docs.google.com/document/d/1_C9twf66rjGkE7HPAsEid-_ZddWcbDoLNw9e2EEkAA8/edit?usp=sharing 
*/

const TextInput = ({
  className /* Allows for external styles to be applied to the component
                using the styled components library
                className prop needs to be passed to the parent JSX element */,
  multiLine,
  rows = 10,
  paddingLeft,
  initialValue,
  width,
}) => {
  const [input, setName] = useState(initialValue);
  return (
    <Container width={width} className={className}>
      {multiLine ? (
        <TextAreaContainer
          rows={rows}
          value={input}
          onChange={(e) => setName(e.target.value)}
        />
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
