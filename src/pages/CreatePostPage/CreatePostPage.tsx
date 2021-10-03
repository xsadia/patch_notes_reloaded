import styled from 'styled-components';
import { Interface } from '../../components/UI/Interface';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/Auth';
import { useHistory } from 'react-router';
import { FormButton } from '../../components/Form/FormButton';

const Erin = styled.h1`
  background-image: linear-gradient(
    to left,
    violet,
    indigo,
    blue,
    green,
    yellow,
    orange,
    red
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-family: 'Comic Sans MS', 'Comic Sans', cursive !important;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    width: 45%;
    border: 2px solid var(--green);
    outline: none;
    padding: 8px;
    font-weight: 500;
  }
`;

const Form = styled.form`
  .quill-input {
    max-width: 640px;
    height: 240px;
    margin-top: 16px;
    border: 2px solid var(--green);

    overflow-y: hidden;

    .ql-header.ql-picker {
      width: 120px;
    }
  }
`;

export const CreatePostPage = () => {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { token, user } = useAuth();
  const history = useHistory();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!title || !subtitle || !content) {
      return;
    }

    await fetch(`https://patch-notes-erin.herokuapp.com/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        subtitle,
        content,
      }),
    });

    history.push('/');
  };

  useEffect(() => {
    if (user?.role !== 'admin') {
      history.push('/');
    }
  }, []);

  return (
    <Interface>
      <Container>
        <Erin>FALA ERIN HAHAHAHAHHAHAHAHAH</Erin>

        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              type="text"
            />

            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Subtítulo"
              type="text"
            />
          </InputWrapper>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="quill-input"
          />
          <FormButton type="submit">Submit</FormButton>
        </Form>
      </Container>
    </Interface>
  );
};
