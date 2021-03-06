import styled from 'styled-components';
import { RiPlantLine } from 'react-icons/ri';
import { FaTwitch, FaTwitter } from 'react-icons/fa';
import { MdCreate } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';

import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';

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
    @media screen and (max-width: 600px) {
      font-size: 1.25rem;
    }
  }

  a {
    text-decoration: none;
    outline: none;
  }
`;

const NavLinkContainer = styled.div`
  display: flex;
  width: 480px;
  justify-content: flex-end;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  transition: filter 0.2s;
  margin-right: 16px;

  @media screen and (max-width: 600px) {
    margin-right: 8px;
  }

  a {
    color: inherit;
    text-decoration: none;
    display: flex;
  }

  &:hover {
    filter: brightness(0.8);
  }

  svg {
    font-size: 1rem;
    margin-right: 8px;
    margin-top: 4px;
    @media screen and (max-width: 600px) {
      font-size: 0.5rem;
      margin-right: 3px;
      margin-top: 0;
    }
  }
`;

const NavLinkTitle = styled.h2`
  font-size: 1.17rem;

  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  color: #fff;
  margin-right: 0.25rem;
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
    width: 128px;
  }
`;

const LogoutButton = styled.button`
  color: #fff;
  display: flex;
  align-items: center;
  transition: filter 0.2s;
  background: none;
  outline: none;
  border: none;

  &:hover {
    filter: brightness(0.8);
  }

  svg {
    font-size: 1rem;
    margin-right: 8px;
    margin-top: 4px;
    @media screen and (max-width: 600px) {
      font-size: 0.5rem;
      margin-right: 3px;
      margin-top: 0;
    }
  }
`;

export const Header = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const history = useHistory();
  return (
    <HeaderContainer>
      <TitleContainer>
        <Link to="/">
          <HeaderTitle>Patch notes</HeaderTitle>
        </Link>
        <RiPlantLine />
      </TitleContainer>
      <NavLinkContainer>
        {user?.role === 'admin' && (
          <NavLink href="/create">
            <MdCreate />
            <NavLinkTitle>Criar</NavLinkTitle>
          </NavLink>
        )}
        <NavLink rel="external" href="https://twitter.com/erinzinhu">
          <FaTwitter />
          <NavLinkTitle>Twitter</NavLinkTitle>
        </NavLink>
        <NavLink rel="external" href="https://twitch.tv/erinzinho">
          <FaTwitch />
          <NavLinkTitle>Twitch</NavLinkTitle>
        </NavLink>
        {isAuthenticated ? (
          <LogoutButton onClick={() => signOut()}>
            <FiLogOut />
            <NavLinkTitle>Logout</NavLinkTitle>
          </LogoutButton>
        ) : (
          <LogoutButton onClick={() => history.push('/signin')}>
            <FaUser />
            <NavLinkTitle>Login</NavLinkTitle>
          </LogoutButton>
        )}
      </NavLinkContainer>
    </HeaderContainer>
  );
};
