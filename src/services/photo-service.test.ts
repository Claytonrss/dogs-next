import { describe, it, expect, vi, type Mock } from 'vitest';
import { PhotoService } from './photo-service';
import type { Photo } from '@/@types/photo';
import { API_URL } from '@/utils/constants';

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

describe('photo-service', () => {
  const photoService = new PhotoService(API_URL);

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
