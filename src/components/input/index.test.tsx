import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './';

describe('<Input />', () => {
  it('renderiza o componente com o estado inicial', () => {
    render(
      <Input
        label="Username"
        type="text"
        name="username"
        value=""
        onChange={vi.fn()}
        data-testid="input-username"
      />,
    );

    const inputElement = screen.getByTestId('input-username');
    const labelElement = screen.getByText('Username');

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('name', 'username');
  });

  it('renderiza o componente com uma mensagem de erro', () => {
    render(
      <Input
        label="Username"
        type="text"
        name="username"
        value=""
        onChange={vi.fn()}
        error="Este campo é obrigatório"
        data-testid="input-username"
      />,
    );

    const errorElement = screen.getByText('Este campo é obrigatório');

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveAttribute('data-testid', 'input-msg-error');
  });

  it('passa corretamente as props adicionais', () => {
    const handleChange = vi.fn();

    render(
      <Input
        label="Password"
        type="password"
        name="password"
        value=""
        onChange={handleChange}
        className="extra-class"
        data-testid="input-password"
      />,
    );

    const inputElement = screen.getByTestId('input-password');

    expect(inputElement).toHaveClass('extra-class');
    expect(inputElement).toHaveAttribute('type', 'password');
    expect(inputElement).toHaveAttribute('name', 'password');

    fireEvent.change(inputElement, { target: { value: 'new-password' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
