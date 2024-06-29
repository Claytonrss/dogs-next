'use server';

import { Photo } from '@/@types/photo';
import { PhotoService } from '@/services/PhotoService';
import { API_URL } from '@/utils/constants';

const defaultPhotoService = new PhotoService(
  `${API_URL}/api/photo/?_page=1&_total=6_user=0`,
);

export default async function photosGet(
  service: PhotoService = defaultPhotoService,
): Promise<Photo[]> {
  try {
    return await service.getPhotos();
  } catch (err) {
    return [];
  }
}
