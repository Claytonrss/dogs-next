import { Photo } from '@/@types/photo';
import FeedPhotos from './FeedPhotos';

export default function Feed({ photos }: { photos: Photo[] }) {
  return (
    <div>
      <FeedPhotos photos={photos} />
    </div>
  );
}
