import React from 'react';
import { Marker } from '@react-google-maps/api';

interface Props {
  position: { lat: number; lng: number };
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

export function CustomMarker({ position, children, onClick }: Props) {
  return (
    <Marker position={position} onClick={onClick}>
      {children}
    </Marker>
  );
}
