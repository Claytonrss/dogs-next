'use server';

import { Photo } from '@/@types/photo';
import { PhotoService } from '@/services/PhotoService';

const apiUrl =
  'https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6_user=0';
const defaultPhotoService = new PhotoService(apiUrl);

export default async function photosGet(
  service: PhotoService = defaultPhotoService,
): Promise<Photo[]> {
  try {
    return await service.getPhotos();
  } catch (err) {
    return [];
  }
}
