import styled from 'styled-components';
import { FormButton } from '../../components/Form/FormButton';
import { FormInput } from '../../components/Form/FormInput';
import { Interface } from '../../components/UI/Interface';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

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
`;

const FormTitle = styled.h1`
  color: var(--green);
  padding-bottom: 24px;
`;

export const LoginPage = () => {
  return (
    <Interface>
      <Container>
        <Form>
          <FormTitle>Login</FormTitle>
          <FormInput icon={HiOutlineMail} placeholder="E-mail" />
          <FormInput icon={HiOutlineLockClosed} placeholder="Password" />
          <FormButton>Submit</FormButton>
        </Form>
      </Container>
    </Interface>
  );
};
