import { ComponentType, InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';
import styled, { css } from 'styled-components';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ComponentType<IconBaseProps>;
  isErrored: boolean;
}

type InputWrapperProps = {
  isErrored: boolean;
};

const InputWrapper = styled.div<InputWrapperProps>`
  width: 360px;
  display: flex;
  align-items: center;

  padding: 8px 24px;
  border: 2px solid var(--green);
  border-radius: 24px;

  margin-top: 16px;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #f21d3d;

      svg {
        color: #f21d3d;
      }
    `}

  svg {
    color: var(--green);
    font-size: 1.25rem;
    margin-right: 4px;
    ${(props) =>
      props.isErrored &&
      css`
        color: #f21d3d;
      `}
  }
`;

const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  border: none;
  background: none;
  outline: none;
`;

export const FormInput = ({
  icon: Icon,
  isErrored,
  ...rest
}: FormInputProps) => {
  return (
    <InputWrapper isErrored={isErrored}>
      <Icon />
      <Input {...rest} />
    </InputWrapper>
  );
};
