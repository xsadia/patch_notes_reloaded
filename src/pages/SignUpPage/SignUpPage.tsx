import styled from 'styled-components';
import { FormButton } from '../../components/Form/FormButton';
import { FormInput } from '../../components/Form/FormInput';
import { Interface } from '../../components/UI/Interface';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/Auth';
import { useHistory } from 'react-router';
import { FormError } from '../../components/Form/FormError';
import { FormRedirect } from '../../components/Form/FormRedirect';
import { RiLoginBoxFill } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 420px;
  width: 400px;
  border: 3px solid var(--green);
  border-radius: 8px;
`;

const FormTitle = styled.h1`
  color: var(--green);
  padding-bottom: 8px;
`;

export const SignUpPage = () => {
  const { signIn, isAuthenticated } = useAuth();
  const history = useHistory();

  const signup = async (email: string, password: string, username: string) => {
    const response = await fetch(
      'https://patch-notes-erin.herokuapp.com/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      toast(data.error, {
        type: 'error',
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    await signIn({ email, password });
    history.push('/');
    return;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('E-email obrigatório')
        .email('Digite um e-mail valido'),
      password: Yup.string()
        .required('Senha obrigatória')
        .min(6, 'No mínimo 6 caracteres'),
      username: Yup.string().required('Username obrigatório'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ email, password, username }) => {
      await signup(email, password, username);

      return;
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  return (
    <Interface>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <FormTitle>Registrar</FormTitle>
          <FormInput
            name="email"
            id="email"
            isErrored={!!formik.errors.email}
            icon={HiOutlineMail}
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <FormError>{formik.errors.email}</FormError>
          <FormInput
            name="username"
            id="username"
            isErrored={!!formik.errors.username}
            icon={BiUser}
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <FormError>{formik.errors.username}</FormError>
          <FormInput
            name="password"
            id="password"
            isErrored={!!formik.errors.password}
            icon={HiOutlineLockClosed}
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <FormError>{formik.errors.password}</FormError>
          <FormButton type="submit">Submit</FormButton>
          <FormRedirect to="/signup">
            Já possui conta? Faça login <RiLoginBoxFill />
          </FormRedirect>
        </Form>
      </Container>
      <ToastContainer />
    </Interface>
  );
};
