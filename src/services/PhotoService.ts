import { Photo, IPhotoService } from '@/@types/photo';

export class PhotoService implements IPhotoService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getPhotos(): Promise<Photo[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }
    return await response.json();
  }
}
