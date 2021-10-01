import styled from 'styled-components';
import { FormButton } from '../../components/Form/FormButton';
import { FormInput } from '../../components/Form/FormInput';
import { Interface } from '../../components/UI/Interface';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/Auth';
import { useHistory } from 'react-router';
import { FormError } from '../../components/Form/FormError';
import { FormRedirect } from '../../components/Form/FormRedirect';
import { FaUserPlus } from 'react-icons/fa';
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
  height: 360px;
  width: 400px;
  border: 3px solid var(--green);
  border-radius: 8px;

  @media screen and (max-width: 600px) {
    width: 320px;
  }
`;

const FormTitle = styled.h1`
  color: var(--green);
  padding-bottom: 8px;
`;

export const LoginPage = () => {
  const { isAuthenticated, saveToLocalStorage } = useAuth();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('E-email obrigatório')
        .email('Digite um e-mail valido'),
      password: Yup.string()
        .required('Senha obrigatória')
        .min(6, 'No mínimo 6 caracteres'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ email, password }) => {
      const response = await fetch(
        'https://patch-notes-erin.herokuapp.com/sessions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      if (!response.ok) {
        toast('Combinação e-mail/senha incorreta', {
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

      const data = await response.json();

      const { token, user } = data;

      localStorage.setItem('@patchNotes:token', token);
      localStorage.setItem('@patchNotes:user', JSON.stringify(user));

      saveToLocalStorage({ token, user });

      history.push('/');

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
          <FormTitle>Login</FormTitle>
          <FormInput
            name="email"
            id="email"
            isErrored={!!formik.errors.email}
            icon={HiOutlineMail}
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <FormError>
            {formik.errors.email ? (
              <>
                <AiOutlineInfoCircle />
                {formik.errors.email}
              </>
            ) : null}
          </FormError>
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
          <FormError>
            {formik.errors.password ? (
              <>
                <AiOutlineInfoCircle />
                {formik.errors.password}
              </>
            ) : null}
          </FormError>
          <FormButton type="submit">Submit</FormButton>
          <FormRedirect to="/signup">
            Não possui conta? Registre-se <FaUserPlus />
          </FormRedirect>
        </Form>
      </Container>
      <ToastContainer />
    </Interface>
  );
};
