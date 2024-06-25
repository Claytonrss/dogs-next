import { describe, it, expect, vi, Mock } from 'vitest';
import { PhotoService } from './PhotoService';
import { Photo } from '@/@types/photo';

global.fetch = vi.fn();

function createFetchResponse({ ok, data }: { ok: boolean; data: Photo[] }) {
  return { ok, json: () => new Promise((resolve) => resolve(data)) };
}

const mockPhotos: Photo[] = [
  {
    id: 225,
    author: 'cat',
    title: 'Yara',
    date: '2020-07-20 21:13:19',
    src: 'https://dogsapi.origamid.dev/wp-content/uploads/2020/07/charles-deluvio-oWTW-jNGl9I-unsplash-1-1000x1000.jpg',
    peso: '5',
    idade: '3',
    acessos: '29221',
    total_comments: '0',
  },
];

describe('PhotoService', () => {
  const apiUrl = 'https://example.com/api/photos';
  const photoService = new PhotoService(apiUrl);

  it('deve buscar fotos com sucesso', async () => {
    (fetch as Mock).mockResolvedValueOnce(
      createFetchResponse({ ok: true, data: mockPhotos }),
    );

    const photos = await photoService.getPhotos();
    expect(photos).toEqual(mockPhotos);
  });

  it('deve lançar um erro quando a requisição falha', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(photoService.getPhotos()).rejects.toThrow(
      'Failed to fetch photos',
    );
  });
});
