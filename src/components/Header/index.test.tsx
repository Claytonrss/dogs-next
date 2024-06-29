import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Header from '.';

describe('Componente Header', () => {
  it('renderiza corretamente', () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
  });

  it('renderiza o link do logo', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: /Dogs - Home/i });
    expect(logoLink).toBeInTheDocument();
  });

  it('renderiza links com os atributos aria-label apropriados', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: /Dogs - Home/i });
    expect(logoLink).toHaveAttribute('aria-label', 'Dogs - Home');
  });

  it('renderiza a imagem do logo', () => {
    render(<Header />);
    const logoImage = screen.getByAltText('Dogs - Home');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/assets/dogs.svg');
    expect(logoImage).toHaveAttribute('width', '28');
    expect(logoImage).toHaveAttribute('height', '22');
  });

  it('renderiza o link para "conta" quando o usuário está logado', () => {
    render(<Header />);
    const accountLink = screen.getByTestId('link-to-account');
    expect(accountLink).toBeInTheDocument();
    expect(accountLink).toHaveAttribute('href', '/conta');
  });
});
