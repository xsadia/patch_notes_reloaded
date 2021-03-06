import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Interface } from '../../components/UI/Interface';
import { Loading } from '../../components/UI/Loading';
import { useAuth } from '../../hooks/Auth';
import { VscTrash } from 'react-icons/vsc';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

type User = {
  _id: string;
  username: string;
};

type Post = {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  user: User;
  createdAt: string;
};

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 640px;
  height: 200px;
  background: var(--green);
  border-radius: 8px;
  padding: 8px;
  transition: filter 0.2s;

  @media screen and (max-width: 600px) {
    width: 239px;
    height: 100px;
    padding: 4px;
  }

  &:hover {
    filter: brightness(0.8);
  }

  a {
    text-decoration: none;
  }

  & + & {
    margin-top: 16px;
  }

  &:last-child {
    margin-bottom: 24px;
  }
`;

const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background: #1a202c;
  color: #fff;
  height: 120px;
  border-radius: 8px;
  padding: 8px 16px;

  @media screen and (max-width: 600px) {
    width: 230px;
    height: 64px;
  }

  a {
    color: inherit;
  }
`;

const PostOwnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 8px 8px;
  width: 600px;

  @media screen and (max-width: 600px) {
    width: 120px;
    height: 26px;
    padding: 2px 4px;
    align-items: flex-start;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostTitle = styled.h1`
  font-weight: 500;
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const PostSubtitle = styled.h2`
  font-weight: 500;
  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
  }
`;

const PostOwnerInfo = styled.h2`
  font-size: 1rem;
  color: #fff;

  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
  }
`;

const DeletePostButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  margin-right: 4px;
  color: #fff;
  transition: color 0.2s;

  &:hover {
    color: #f21d3d;
  }
  svg {
    font-size: 1.25rem;

    @media screen and (max-width: 600px) {
      font-size: 0.75rem;
    }
  }
`;

const PaginationContainer = styled.div`
  width: 640px;

  margin-top: 8px;
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 600px) {
    width: 239px;
  }
`;

const PaginationButtonContainer = styled.div`
  display: flex;

  width: 180px;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    width: 100px;
  }
`;

const PaginationButton = styled.button`
  background: none;
  border: none;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  margin-left: auto;
  transition: filter 0.2s;

  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
  }

  &:hover {
    filter: brightness(0.5);
  }

  svg {
    color: var(--green);
    margin-top: 2px;
    margin-right: 2px;
  }
`;

export const Homepage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user, token } = useAuth();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://patch-notes-erin.herokuapp.com/posts?page=${currentPage}&limit=5`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    console.log(currentPage);

    const data = await response.json();

    if (data.length === 0) {
      setCurrentPage((current) => current - 1);
      return;
    }

    setPosts([...data]);
    setIsLoading(false);
  }, [currentPage]);

  const handleDeletePost = async (postId: string) => {
    await fetch(`https://patch-notes-erin.herokuapp.com/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    });

    const postIndex = posts.findIndex((post) => post._id === postId);

    if (postIndex < 0) {
      return;
    }

    posts.splice(postIndex, 1);
    setPosts((prev) => [...prev]);
    return;
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  /* useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((currentPage) => currentPage + 1);
      }
    });

    intersectionObserver.observe(document.querySelector('#ward'));
    return () => intersectionObserver.disconnect();
  }, []); */

  return (
    <Interface>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {posts.map((post) => (
            <PostContainer key={post._id}>
              <PostInfoContainer>
                <Link to={`/posts/${post._id}`}>
                  <PostTitle>{post.title}</PostTitle>
                  <PostSubtitle>{post.subtitle}</PostSubtitle>
                </Link>
              </PostInfoContainer>
              <ButtonContainer>
                <Link to={`/posts/${post._id}`}>
                  <PostOwnerContainer>
                    <PostOwnerInfo>{post?.user?.username}</PostOwnerInfo>
                    <PostOwnerInfo>
                      {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </PostOwnerInfo>
                  </PostOwnerContainer>
                </Link>
                {user?.role && (
                  <DeletePostButton onClick={() => handleDeletePost(post._id)}>
                    <VscTrash />
                  </DeletePostButton>
                )}
              </ButtonContainer>
            </PostContainer>
          ))}

          <PaginationContainer>
            <PaginationButtonContainer>
              {currentPage > 1 && (
                <PaginationButton
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <AiOutlineLeft />
                  pr??ximo
                </PaginationButton>
              )}
              <PaginationButton onClick={() => setCurrentPage(currentPage + 1)}>
                anterior
                <AiOutlineRight />
              </PaginationButton>
            </PaginationButtonContainer>
          </PaginationContainer>
        </>
      )}
    </Interface>
  );
};
