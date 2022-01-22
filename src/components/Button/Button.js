import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const ButtonBase = styled.button`
  font: ${({ theme }) => theme.fonts.bold18};
  border: none;
  border-radius: 15px;
  padding: 4px 22px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: max-content;
`;

const PrimaryButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colours.yellows.yellow1};
  color: ${({ theme }) => theme.colours.blacks.black3};
`;

const SecondaryButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colours.blacks.black3};
  color: ${({ theme }) => theme.colours.yellows.yellow1};
`;

const TertiaryButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colours.blues.blue2};
  color: ${({ theme }) => theme.colours.white};
`;

const CancelButton = styled(ButtonBase)`
  background-color: white;
  font: ${({ theme }) => theme.fonts.medium18};
  border: none;
  text-decoration: underline;
`;

const getButtonComponent = (secondary, tertiary, cancel) => {
  if (secondary) {
    return SecondaryButton;
  }
  if (tertiary) {
    return TertiaryButton;
  }
  if (cancel) {
    return CancelButton;
  }
  return PrimaryButton;
};

// Only set one flag (secondary, tertiary, cancel);
const Button = ({
  label,
  secondary = false,
  tertiary = false,
  cancel = false,
  onClick,
  link = false,
  to,
  className,
  children,
  disabled = false,
}) => {
  const ButtonComponent = getButtonComponent(secondary, tertiary, cancel);
  const buttonText = label === undefined ? children : label;
  const history = useHistory();
  return link ? (
    /* Used to use react-router Link Component, but it made styles very repetitive */
    <ButtonComponent
      className={className}
      disabled={disabled}
      onClick={() => {
        history.push(to);
      }}
    >
      {buttonText}
    </ButtonComponent>
  ) : (
    <ButtonComponent
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </ButtonComponent>
  );
};

export default Button;
