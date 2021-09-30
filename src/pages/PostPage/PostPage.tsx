import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import styled from 'styled-components';
import { Interface } from '../../components/UI/Interface';
import { BsArrowLeftShort } from 'react-icons/bs';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';

type PostParams = {
  id: string;
};

type Comment = {
  likes: string[];
  _id: string;
  content: string;
  owner: User;
  createdAt: string;
};

type User = {
  username: string;
  _id: string;
};

type Post = {
  _id: string;
  title: string;
  content: string;
  comments: Comment[];
  user: User;
  createdAt: string;
};

const PostContentContainer = styled.main`
  width: 960px;
  line-height: 130%;
  background: #1a202c;
  color: #fff;
  padding: 24px;
  margin-bottom: 24px;
  border: 3px solid var(--green);
  border-radius: 8px;

  a {
    color: var(--green);
  }
`;

const PostHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 960px;
`;

const PostTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 960px;
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 8px;
  border: 3px solid var(--green);
  background: #1a202c;
`;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--green);
  padding: 8px;
  border-radius: 8px;
  color: #fff;
  & + & {
    margin-top: 8px;
  }

  div.initials-avatar {
    width: 32px;
    height: 32px;
    justify-content: center;
  }

  .initials-avatar div {
    color: var(--green) !important;
    background: #fff;
  }
`;

const CommentInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CommentUserContainer = styled.div`
  margin-left: 8px;
`;

const CommentDateContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CommentBodyContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CommentLikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NumberOfLikes = styled.span`
  font-size: 1rem;
`;

const CommentDate = styled.span`
  margin: 3px 0 0 4px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const UserUsername = styled.h1`
  font-size: 1rem;
  font-weight: 600;
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--green);
`;

const PostDate = styled.h2`
  color: var(--green);
`;

const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--green);
  transition: filter 0.2s;

  svg {
    margin-top: 4px;
    font-size: 1.5rem;
  }

  &:hover {
    filter: brightness(0.8);
  }
`;

export const PostPage = () => {
  const { params } = useRouteMatch<PostParams>();
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const history = useHistory();

  const fetchPost = async () => {
    const response = await fetch(
      `https://patch-notes-erin.herokuapp.com/posts/${params.id}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    const data = await response.json();
    console.log(data.comments);
    setPost(data.post);
    setComments([...data.comments]);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const dateDiff = (date: Date) => {
    const oneDay = 1000 * 60 * 60 * 24;
    let now = Date.now();
    let time = date.getTime();
    let diffTime = now - time;
    return Math.round(diffTime / oneDay);
  };

  return (
    <Interface>
      <PostHeaderContainer>
        <PostTitleContainer>
          <PostTitle>{post?.title}</PostTitle>
          <PostDate>
            {new Date(post?.createdAt as string).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </PostDate>
        </PostTitleContainer>
        <BackButton onClick={() => history.push('/')}>
          <BsArrowLeftShort />
          voltar
        </BackButton>
      </PostHeaderContainer>
      <PostContentContainer
        dangerouslySetInnerHTML={{ __html: post?.content as string }}
      />
      <CommentSectionContainer>
        {comments.map((comment) => (
          <CommentContainer key={comment._id}>
            <CommentInfoContainer>
              <CommentBodyContainer>
                <InitialsAvatar name={comment.owner.username} />
                <CommentUserContainer>
                  <CommentDateContainer>
                    <UserUsername>{comment.owner.username}</UserUsername>
                    <CommentDate>
                      {`há ${dateDiff(new Date(comment.createdAt))} dias`}
                    </CommentDate>
                  </CommentDateContainer>
                  <p>{comment.content}</p>
                </CommentUserContainer>
              </CommentBodyContainer>
            </CommentInfoContainer>
            <CommentLikeContainer>
              <NumberOfLikes>{comment.likes.length}</NumberOfLikes>
            </CommentLikeContainer>
          </CommentContainer>
        ))}
      </CommentSectionContainer>
    </Interface>
  );
};
