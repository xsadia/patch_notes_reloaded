import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = styled.button`
  width: 360px;
  padding: 12px 16px;
  background: linear-gradient(
    90deg,
    rgba(73, 159, 104, 1) 0%,
    rgba(53, 181, 72, 1) 35%,
    rgba(0, 255, 89, 1) 100%
  );
  border: none;
  border-radius: 24px;

  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  transition: filter 0.2s;
  margin-top: 16px;

  @media screen and (max-width: 600px) {
    width: 280px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const FormButton = ({ children, ...rest }: FormButtonProps) => {
  return <Button {...rest}>{children}</Button>;
};
