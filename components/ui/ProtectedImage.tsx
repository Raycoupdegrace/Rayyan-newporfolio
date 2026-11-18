'use client';

import Image, { type ImageProps } from 'next/image';

export function ProtectedImage({ alt, className, ...props }: ImageProps) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH || '/Rayyan-newporfolio';
  const src =
    typeof props.src === 'string' &&
    props.src.startsWith('/') &&
    !props.src.startsWith('//')
      ? `${basePath}${props.src}`
      : props.src;

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
      className={`${className ?? ''} select-none [-webkit-touch-callout:none]`}
    />
  );
}
