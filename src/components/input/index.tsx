import type { InputHTMLAttributes } from 'react';
import { ErrorMessage, Label, StyledInput, Wrapper } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  'data-testid'?: string;
};

export function Input({ label, error, ...props }: InputProps) {
  return (
    <Wrapper>
      <Label htmlFor={props.name}>{label}</Label>
      <StyledInput {...props} />
      {error && (
        <ErrorMessage data-testid="input-msg-error">{error}</ErrorMessage>
      )}
    </Wrapper>
  );
}
