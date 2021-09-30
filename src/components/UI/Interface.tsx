import { ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from './Header';

type InterfaceProps = {
  children: ReactNode;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 96px;
`;

export const Interface = ({ children }: InterfaceProps) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};
