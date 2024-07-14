import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '.';

describe('<Footer />', () => {
  it('renderiza o componente Footer', () => {
    const { container } = render(<Footer />);
    expect(container).toBeInTheDocument();
  });

  it('renderiza a imagem no footer com os atributos corretos', () => {
    const { getByAltText } = render(<Footer />);
    const image = getByAltText('Dogs - Home');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/dogs-footer.svg');
    expect(image).toHaveAttribute('width', '28');
    expect(image).toHaveAttribute('height', '22');
  });

  it('renderiza o texto no footer', () => {
    const { getByText } = render(<Footer />);
    const text = getByText('Dogs. Alguns direitos reservados.');
    expect(text).toBeInTheDocument();
  });
});
