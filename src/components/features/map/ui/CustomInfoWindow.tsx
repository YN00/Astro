import { InfoWindow } from '@react-google-maps/api';
import React from 'react';

interface Props {
  position: { lat: number; lng: number };
  children?: React.ReactNode;
}

export function CustomInfoWindow({ position, children }: Props) {
  return (
    <InfoWindow
      position={position}
      options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
      onCloseClick={() => {}}
    >
      <>{children}</>
    </InfoWindow>
  );
}
