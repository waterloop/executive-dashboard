import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

const Title = styled.p`
  font: ${({ theme }) => theme.fonts.bold18};
  color: ${({ theme }) => theme.colours.blues.blue1};
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 10px 20px;
  width: 100%;
`;

const RequiredText = styled.p`
  color: ${({ theme }) => theme.colours.reds.red1};
  font: ${({ theme }) => theme.fonts.medium14};
`;

const FormContainer = ({
  title,
  children,
  className,
  requiredText = 'This field cannot be left blank.',
  isError = false,
}) => (
  <OuterContainer className={className}>
    <Title>{title}</Title>
    {typeof children === 'function' ? children(isError) : children}
    {isError && <RequiredText>{requiredText}</RequiredText>}
  </OuterContainer>
);

export default FormContainer;

// FormContainer.propTypes = {
//   title: PropTypes.string,
//   className: PropTypes.string,
//   requiredText: PropTypes.string,
// };
