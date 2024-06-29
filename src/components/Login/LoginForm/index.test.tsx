import { render, screen } from '@testing-library/react';
import { useFormState as originalUseFormState } from 'react-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ReactDom from 'react-dom';
import LoginForm from './';

vi.mock('react-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof ReactDom;
  return {
    ...actual,
    useFormState: vi.fn(() => [
      { ok: false, error: null, data: null },
      vi.fn(),
    ]),
    useFormStatus: () => ({ pending: false }),
  };
});

describe('LoginForm', () => {
  let useFormStateMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    useFormStateMock = vi.mocked(originalUseFormState) as ReturnType<
      typeof vi.fn
    >;
  });

  it('renderiza o componente com o estado inicial', () => {
    useFormStateMock.mockReturnValue([
      { ok: false, error: null, data: null },
      vi.fn(),
    ]);

    render(<LoginForm />);

    const form = screen.getByTestId('login-form');
    const button = screen.getByRole('button');
    const inputUser = screen.getByPlaceholderText('usuario');
    const inputPassword = screen.getByPlaceholderText('senha');

    expect(form).toBeInTheDocument();
    expect(inputUser).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('exibe mensagem de erro quando ocorre um erro', () => {
    useFormStateMock.mockReturnValue([
      { ok: false, error: 'Erro de teste', data: null },
      vi.fn(),
    ]);

    render(<LoginForm />);
    expect(screen.getByText('Erro de teste')).toBeInTheDocument();
  });
});
