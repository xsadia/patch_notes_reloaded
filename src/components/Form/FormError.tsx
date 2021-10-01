import { ReactNode } from 'react';
import styled from 'styled-components';

type FormErrorProps = {
  children: ReactNode;
};

const ErrorMessage = styled.span`
  color: #f21d3d;
  font-size: 1rem;
  margin-top: 4px;
  display: flex;
  svg {
    margin: 4px 4px 0 0;
    font-size: 1rem;
  }
`;

export const FormError = ({ children }: FormErrorProps) => {
  return <ErrorMessage>{children}</ErrorMessage>;
};
