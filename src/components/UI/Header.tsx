import styled from 'styled-components';
import { RiPlantLine } from 'react-icons/ri';
import { FaTwitch, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  z-index: 9999;
  position: fixed;
  height: 50px;
  width: 100vw;
  background: var(--green);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  color: #fff;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.4);
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
  }

  a {
    text-decoration: none;
  }
`;

const NavLinkContainer = styled.div`
  display: flex;
  width: 240px;
  justify-content: space-evenly;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }

  svg {
    font-size: 1rem;
    margin-right: 8px;
    margin-top: 4px;
  }
`;

const NavLinkTitle = styled.h2`
  font-size: 1.17rem;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  color: #fff;
  margin-right: 0.25rem;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <Link to="/">
          <HeaderTitle>Patch notes</HeaderTitle>
        </Link>
        <RiPlantLine />
      </TitleContainer>
      <NavLinkContainer>
        <NavLink rel="external" href="https://twitter.com/erinzinhu">
          <FaTwitter />
          <NavLinkTitle>Twitter</NavLinkTitle>
        </NavLink>
        <NavLink rel="external" href="https://twitch.tv/erinzinho">
          <FaTwitch />
          <NavLinkTitle>Twitch</NavLinkTitle>
        </NavLink>
      </NavLinkContainer>
    </HeaderContainer>
  );
};
