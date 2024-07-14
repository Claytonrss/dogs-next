'use client';
import type { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import { ButtonFormWrapper } from './styles';

type ButtonFormProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  'data-testid'?: string;
};

export function ButtonForm({ children, ...props }: ButtonFormProps) {
  const { pending } = useFormStatus();
  return (
    <ButtonFormWrapper type="submit" disabled={pending} {...props}>
      {pending ? 'Carregando...' : children}
    </ButtonFormWrapper>
  );
}
