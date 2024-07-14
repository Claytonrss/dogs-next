import type { Photo } from '@/@types/photo';
import { FeedPhotos } from './feed-photos';

export function Feed({ photos }: { photos: Photo[] }) {
  return (
    <div>
      <FeedPhotos photos={photos} />
    </div>
  );
}
