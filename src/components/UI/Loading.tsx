import styled from 'styled-components';
import { GiPlantWatering } from 'react-icons/gi';

const Container = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: var(--green);

  svg {
    font-size: 3rem;

    animation-name: upAndDown;
    animation-duration: 1800ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @keyframes upAndDown {
      0% {
        transform: translatey(0px);
      }
      50% {
        transform: translatey(-20px);
      }
      100% {
        transform: translatey(0px);
      }
    }
  }
`;

const LoadingMessage = styled.h1`
  color: var(--green);
`;

export const Loading = () => {
  return (
    <Container>
      <GiPlantWatering />
      <LoadingMessage>Carregando...</LoadingMessage>
    </Container>
  );
};
