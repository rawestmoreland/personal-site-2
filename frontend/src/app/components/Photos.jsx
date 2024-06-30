import clsx from 'clsx';
import Image from 'next/image';
import { getPocketbaseMedia } from 'util/media';

export function Photos({ images }) {
  let rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images
          .sort((a, b) => a.order - b.order)
          .map((image, imageIndex) => (
            <div
              key={image.id}
              className={clsx(
                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-white sm:w-72 sm:rounded-2xl',
                rotations[imageIndex % rotations.length],
                { 'bg-zinc-100 dark:bg-zinc-800': !(imageIndex % 2) }
              )}
            >
              <Image
                src={getPocketbaseMedia(
                  image['@collectionName'],
                  image.id,
                  image.image
                )}
                priority
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className={clsx('absolute inset-0 h-full w-full', {
                  'object-cover': !(imageIndex % 2),
                  'object-contain': imageIndex % 2,
                })}
                height={329}
                width={298}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
