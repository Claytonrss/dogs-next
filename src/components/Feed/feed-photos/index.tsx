import Image from 'next/image';
import Link from 'next/link';
import type { Photo } from '@/@types/photo';
import { FeedPhotosUl } from './styles';

export function FeedPhotos({ photos }: { photos: Photo[] }) {
  return (
    <FeedPhotosUl className="animeLeft">
      {photos.map((photo, index) => {
        return (
          <li key={`${photo.id}_${index}`} className="photo">
            <Link href={`/foto/${photo.id}`} scroll={false}>
              <Image
                src={photo.src}
                width={1500}
                height={1500}
                alt={photo.title}
                sizes="80vw"
              />
              <span className="visualizacao">{photo.acessos}</span>
            </Link>
          </li>
        );
      })}
    </FeedPhotosUl>
  );
}
