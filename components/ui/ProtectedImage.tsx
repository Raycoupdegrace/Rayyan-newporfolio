'use client';

import Image, { type ImageProps } from 'next/image';

export function ProtectedImage({ alt, className, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
      className={`${className ?? ''} select-none [-webkit-touch-callout:none]`}
    />
  );
}
