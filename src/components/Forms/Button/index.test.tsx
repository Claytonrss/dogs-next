import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFormStatus as originalUseFormStatus } from 'react-dom';
import ButtonForm from './';

vi.mock('react-dom', () => ({
  useFormStatus: vi.fn(),
}));

describe('Componente ButtonForm', () => {
  let useFormStatusMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    useFormStatusMock = originalUseFormStatus as ReturnType<typeof vi.fn>;
  });

  it('renderiza o componente com o estado inicial', () => {
    useFormStatusMock.mockReturnValue({ pending: false });

    render(<ButtonForm data-testid="button-form">Login</ButtonForm>);
    const button = screen.getByTestId('button-form');
    expect(button).toHaveTextContent('Login');
    expect(button).not.toBeDisabled();
  });

  it('renderiza o componente no estado pendente', () => {
    useFormStatusMock.mockReturnValue({ pending: true });

    render(<ButtonForm data-testid="button-form">Login</ButtonForm>);
    const button = screen.getByTestId('button-form');
    expect(button).toHaveTextContent('Carregando...');
    expect(button).toBeDisabled();
  });

  it('passa corretamente as props adicionais', () => {
    useFormStatusMock.mockReturnValue({ pending: false });

    render(
      <ButtonForm
        data-testid="custom-button"
        className="extra-class"
        type="submit"
      >
        Enviar
      </ButtonForm>,
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveTextContent('Enviar');
    expect(button).toHaveClass('extra-class');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });
});
