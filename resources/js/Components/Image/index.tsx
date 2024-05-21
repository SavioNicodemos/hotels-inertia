import { CardMedia, SxProps } from '@mui/material';
import { useState } from 'react';

import placeholderImage from '@/assets/no-image.png';

export function Image({ imageUrl, height, alt, sx }: Props) {
  const [imageSrc, setImageSrc] = useState(imageUrl);

  const handleImageError = () => {
    setImageSrc(placeholderImage);
  };

  return (
    <CardMedia
      component="img"
      height={String(height)}
      alt={alt}
      src={imageSrc}
      onError={handleImageError}
      sx={sx}
    />
  );
}

type Props = {
  imageUrl: string;
  height: number;
  alt: string;
  sx?: SxProps;
};
