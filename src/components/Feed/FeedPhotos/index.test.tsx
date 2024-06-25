import { render, screen } from '@testing-library/react';
import FeedPhotos from './';
import { Photo } from '@/@types/photo';
import { describe, it, expect } from 'vitest';

const mockPhotos: Photo[] = [
  {
    id: 1,
    author: 'cat',
    title: 'Photo 1',
    date: '2020-07-20 21:13:19',
    src: 'https://example.com/photo1.jpg',
    peso: '5',
    idade: '3',
    acessos: '29221',
    total_comments: '0',
  },
  {
    id: 2,
    author: 'dog',
    title: 'Photo 2',
    date: '2020-07-20 21:13:19',
    src: 'https://example.com/photo2.jpg',
    peso: '5',
    idade: '3',
    acessos: '12345',
    total_comments: '0',
  },
];

describe('FeedPhotos', () => {
  it('deve renderizar todas as fotos passadas como props', () => {
    render(<FeedPhotos photos={mockPhotos} />);

    mockPhotos.forEach((photo) => {
      const imgElement = screen.getByAltText(photo.title);
      expect(imgElement).toBeInTheDocument();

      const linkElement = screen.getByRole('link', {
        name: new RegExp(photo.acessos),
      });
      expect(linkElement).toHaveAttribute('href', `/foto/${photo.id}`);
    });
  });

  it('deve renderizar corretamente os acessos das fotos', () => {
    render(<FeedPhotos photos={mockPhotos} />);

    mockPhotos.forEach((photo) => {
      const spanElement = screen.getByText(photo.acessos);
      expect(spanElement).toBeInTheDocument();
    });
  });

  it('deve renderizar as imagens com o alt correto', () => {
    render(<FeedPhotos photos={mockPhotos} />);

    mockPhotos.forEach((photo) => {
      const imgElement = screen.getByAltText(photo.title);
      expect(imgElement).toBeInTheDocument();
    });
  });

  it('deve renderizar as imagens com o src contendo a URL correta', () => {
    render(<FeedPhotos photos={mockPhotos} />);

    mockPhotos.forEach((photo) => {
      const imgElement = screen.getByAltText(photo.title);
      expect(imgElement).toBeInTheDocument();
      const encodedSrc = encodeURIComponent(photo.src);
      expect(imgElement.getAttribute('src')).toContain(encodedSrc);
    });
  });
});
