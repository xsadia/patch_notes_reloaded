import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Interface } from '../../components/UI/Interface';
import { Loading } from '../../components/UI/Loading';
import { useAuth } from '../../hooks/Auth';
import { VscTrash } from 'react-icons/vsc';

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

export const Homepage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, token } = useAuth();

  const fetchPosts = async () => {
    setIsLoading(true);
    const response = await fetch(
      'https://patch-notes-erin.herokuapp.com/posts',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    const data = await response.json();

    setPosts(data);
    setIsLoading(false);
  };

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
  }, []);

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
                    <PostOwnerInfo>{post.user.username}</PostOwnerInfo>
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
        </>
      )}
    </Interface>
  );
};
