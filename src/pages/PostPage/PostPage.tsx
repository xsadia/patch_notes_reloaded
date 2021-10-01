import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import styled, { css } from 'styled-components';
import { Interface } from '../../components/UI/Interface';
import { BsArrowLeftShort } from 'react-icons/bs';
import { VscTrash } from 'react-icons/vsc';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { useAuth } from '../../hooks/Auth';
import { Loading } from '../../components/UI/Loading';

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

type InputWrapperProps = {
  isInputFocused: boolean;
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

  @media screen and (max-width: 600px) {
    width: 300px;

    p {
      font-size: 0.65rem;
    }

    li {
      font-size: 0.6rem;
    }
  }

  a {
    color: var(--green);
  }

  li {
    font-weight: 500;
  }
`;

const PostHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 960px;
  margin-bottom: 4px;

  @media screen and (max-width: 600px) {
    width: 300px;
  }
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

  @media screen and (max-width: 600px) {
    width: 300px;
  }
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

    @media screen and (max-width: 600px) {
      display: none;
    }
  }

  .initials-avatar div {
    color: var(--green) !important;
    background: #fff;

    @media screen and (max-width: 600px) {
      display: none;
    }
  }
`;

const CommentInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CommentUserContainer = styled.div`
  margin-left: 8px;
  word-wrap: break-word;
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
  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
  }
`;

const CommentDate = styled.span`
  margin: 3px 0 0 4px;
  font-size: 0.875rem;
  font-weight: 600;

  @media screen and (max-width: 600px) {
    font-size: 0.6rem;
    margin: 1px 0 0 2px;
  }
`;

const CommentContent = styled.p`
  max-width: 820px;
  font-size: 0.875rem;
  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
    max-width: 240px;
  }
`;

const UserUsername = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  @media screen and (max-width: 600px) {
    font-size: 0.65rem;
  }
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--green);

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const PostDate = styled.h2`
  color: var(--green);
  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
  }
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

  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
  }

  svg {
    margin-top: 4px;
    font-size: 1.5rem;
    @media screen and (max-width: 600px) {
      font-size: 0.75rem;
      margin-top: 2px;
    }
  }

  &:hover {
    filter: brightness(0.8);
  }
`;

const LikeButton = styled.button`
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
    font-size: 1rem;
    @media screen and (max-width: 600px) {
      font-size: 0.5rem;
    }
  }
`;

const DeleteCommentButton = styled.button`
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
    font-size: 1rem;

    @media screen and (max-width: 600px) {
      font-size: 0.5rem;
    }
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const FormButton = styled.button`
  width: 132px;
  margin: 8px 0 0 0;
  padding: 8px;
  background: var(--green);
  font-weight: 600;
  color: #f7f7f7;
  border: 2px solid var(--green);
  border-radius: 6px;
  transition: filter 0.2s;

  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
    width: 66px;
    padding: 4px;
  }

  &:disabled {
    background: #ccc;
    color: #909090;
    border-color: #ccc;

    &:hover {
      filter: brightness(1);
    }
  }
  &:hover {
    filter: brightness(0.9);
  }
`;

const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  padding: 8px;
  background: #f7f7f7;
  border: 2px solid #f7f7f7;
  border-radius: 8px;

  @media screen and (max-width: 600px) {
    padding: 4px;
  }

  ${(props) =>
    props.isInputFocused &&
    css`
      border-color: var(--green);
    `}
`;

const CommentInput = styled.input`
  flex: 1;
  outline: none;
  background: none;
  border: none;
  overflow-wrap: break-word;
  font-size: 1rem;
  @media screen and (max-width: 600px) {
    font-size: 0.65rem;
  }
`;

const PostOwner = styled.h4`
  font-size: 1.17rem;
  color: var(--green);

  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
  }
`;

export const PostPage = () => {
  const { params } = useRouteMatch<PostParams>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInputValue, setCommentInputValue] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const history = useHistory();
  const { user, token, isAuthenticated } = useAuth();

  const fetchPost = async () => {
    setIsLoading(true);
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

    setPost(data.post);
    setComments([...data.comments]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const timeSince = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return `${Math.floor(interval)} anos`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} meses`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} dias`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} horas`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} minutos`;
    }
    return `${Math.floor(seconds)} segundos`;
  };

  let tempId = 0;

  const handlePostComment = async (event: FormEvent) => {
    event.preventDefault();

    if (!isAuthenticated) {
      history.push('/signin');
      return;
    }

    await fetch(
      `https://patch-notes-erin.herokuapp.com/comments/${params.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          content: commentInputValue,
        }),
      },
    );

    const newComment = {
      content: commentInputValue,
      _id: `newComment${tempId++}`,
      owner: {
        username: user.username,
        _id: user._id,
      },
      createdAt: new Date().toISOString(),
      likes: [],
    } as Comment;

    setComments((prev) => [newComment, ...prev]);

    setCommentInputValue('');

    return;
  };

  const handleLike = async (commentId: string) => {
    if (!isAuthenticated) {
      history.push('/signin');
      return;
    }

    const commentIndex = comments.findIndex(
      (comment) => comment._id === commentId,
    );

    if (commentIndex < 0) {
      return;
    }

    await fetch(
      `https://patch-notes-erin.herokuapp.com/comments/${params.id}/${commentId}/like`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      },
    );

    const likeIndex = comments[commentIndex].likes.findIndex(
      (like) => like === user._id,
    );

    if (likeIndex < 0) {
      comments[commentIndex].likes.push(user._id);

      setComments((prev) => [...prev]);
      return;
    }

    comments[commentIndex].likes.splice(likeIndex, 1);

    setComments((prev) => [...prev]);
    return;
  };

  const handleDelete = async (commentId: string) => {
    const commentIndex = comments.findIndex(
      (comment) => comment._id === commentId,
    );

    if (commentIndex < 0) {
      return;
    }

    await fetch(
      `https://patch-notes-erin.herokuapp.com/comments/${params.id}/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      },
    );

    comments.splice(commentIndex, 1);

    setComments((prev) => [...prev]);

    return;
  };

  return (
    <Interface>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PostHeaderContainer>
            <PostTitleContainer>
              <PostTitle>{post?.title}</PostTitle>
              <PostDate>
                {new Date(post?.createdAt as string).toLocaleDateString(
                  'pt-BR',
                  {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  },
                )}
              </PostDate>
              <PostOwner>{post?.user.username}</PostOwner>
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
            <CommentForm onSubmit={handlePostComment}>
              <InputWrapper
                isInputFocused={isInputFocused}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              >
                <CommentInput
                  value={commentInputValue}
                  onChange={(e) => setCommentInputValue(e.target.value)}
                  placeholder="Faça um comentário"
                />
              </InputWrapper>
              <FormButton
                disabled={commentInputValue.length < 1 || !isAuthenticated}
              >
                Comentar
              </FormButton>
            </CommentForm>
            {comments.map((comment) => (
              <CommentContainer key={comment._id}>
                <CommentInfoContainer>
                  <CommentBodyContainer>
                    <InitialsAvatar name={comment.owner.username} />
                    <CommentUserContainer>
                      <CommentDateContainer>
                        <UserUsername>{comment.owner.username}</UserUsername>
                        <CommentDate>
                          {`há ${timeSince(new Date(comment.createdAt))}`}
                        </CommentDate>
                      </CommentDateContainer>
                      <CommentContent>{comment.content}</CommentContent>
                    </CommentUserContainer>
                  </CommentBodyContainer>
                </CommentInfoContainer>
                <CommentLikeContainer>
                  {comment.owner._id === user?._id && (
                    <DeleteCommentButton
                      onClick={() => handleDelete(comment._id)}
                    >
                      <VscTrash />
                    </DeleteCommentButton>
                  )}
                  <LikeButton onClick={() => handleLike(comment._id)}>
                    {comment.likes.some((like) => like === user?._id) ? (
                      <AiFillHeart />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </LikeButton>
                  <NumberOfLikes>{comment.likes.length}</NumberOfLikes>
                </CommentLikeContainer>
              </CommentContainer>
            ))}
          </CommentSectionContainer>
        </>
      )}
    </Interface>
  );
};
