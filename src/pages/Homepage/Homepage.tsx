import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Interface } from '../../components/UI/Interface';
import { Loading } from '../../components/UI/Loading';
import { useAuth } from '../../hooks/Auth';

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
  width: 640px;
  height: 200px;
  background: var(--green);
  border-radius: 8px;
  padding: 8px;
  transition: filter 0.2s;

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
`;

const PostOwnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 8px 8px;
`;

const PostTitle = styled.h1`
  font-weight: 500;
`;

const PostSubtitle = styled.h2`
  font-weight: 500;
`;

const PostOwnerInfo = styled.h2`
  font-size: 1rem;
  color: #fff;
`;

export const Homepage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn } = useAuth();

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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Interface>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <button
            onClick={() =>
              signIn({ email: 'fizi@gmail.com', password: '123123' })
            }
          >
            crica
          </button>
          {posts.map((post) => (
            <PostContainer key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <PostInfoContainer>
                  <PostTitle>{post.title}</PostTitle>
                  <PostSubtitle>{post.subtitle}</PostSubtitle>
                </PostInfoContainer>
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
            </PostContainer>
          ))}
        </>
      )}
    </Interface>
  );
};
