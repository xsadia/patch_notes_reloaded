import { ComponentType, InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';
import styled from 'styled-components';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ComponentType<IconBaseProps>;
}

const InputWrapper = styled.div`
  width: 360px;
  display: flex;
  align-items: center;

  padding: 8px 24px;
  border: 2px solid var(--green);
  border-radius: 24px;

  margin-bottom: 16px;

  svg {
    color: var(--green);
    font-size: 1.25rem;
    margin-right: 4px;
  }
`;

const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  border: none;
  background: none;
  outline: none;
`;

export const FormInput = ({ icon: Icon, ...rest }: FormInputProps) => {
  return (
    <InputWrapper>
      <Icon />
      <Input {...rest} />
    </InputWrapper>
  );
};
