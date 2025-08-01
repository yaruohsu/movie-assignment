import type { FC } from 'react';

interface LogoImageProps {
  src: string
  alt: string
  className?: string
}

export const LogoImage: FC<LogoImageProps> = ({ src, alt, className = '' }) => {
  const isPng = src.toLowerCase().endsWith('.png')

  const baseClass = 'h-6 object-contain'
  const pngClass = 'bg-white rounded-sm px-1 py-0.5'

  return (
    <img
      src={src}
      alt={alt}
      className={`${baseClass} ${isPng ? pngClass : ''} ${className}`}
    />
  )
}
