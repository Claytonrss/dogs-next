import { describe, it, expect, vi } from 'vitest';
import photosGet from './photos-get';
import { PhotoService } from '@/services/PhotoService';
import { Photo } from '@/@types/photo';

global.fetch = vi.fn();

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

describe('photosGet', () => {
  it('deve buscar fotos com sucesso', async () => {
    const mockService = new PhotoService('');
    vi.spyOn(mockService, 'getPhotos').mockResolvedValueOnce(mockPhotos);

    const photos = await photosGet(mockService);
    expect(photos).toEqual(mockPhotos);
  });

  it('deve retornar um array vazio quando a requisição falha', async () => {
    const mockService = new PhotoService('');
    vi.spyOn(mockService, 'getPhotos').mockRejectedValueOnce(
      new Error('Failed to fetch photos'),
    );

    const photos = await photosGet(mockService);
    expect(photos).toEqual([]);
  });
});
