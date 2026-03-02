'use client';
import { useState } from 'react';
import { getIcon } from '@/lib/techIcons';

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function TechIcon({ name, size = 16, className = '' }: TechIconProps) {
  const [failed, setFailed] = useState(false);
  const url = getIcon(name);

  if (!url || failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain', display: 'inline-block', flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
  );
}
