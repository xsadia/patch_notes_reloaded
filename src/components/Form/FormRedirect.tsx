import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type FormRedirectProps = {
  to: string;
  children: ReactNode;
};

const LinkWrapper = styled.div`
  margin-top: 4px;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }

  a {
    display: flex;
    color: var(--green);
    text-decoration: none;
    align-items: center;

    svg {
      font-size: 1rem;
      margin: 2px 0 0 4px;
    }
  }
`;

export const FormRedirect = ({ children, to }: FormRedirectProps) => {
  return (
    <LinkWrapper>
      <Link to={to}>{children}</Link>
    </LinkWrapper>
  );
};
