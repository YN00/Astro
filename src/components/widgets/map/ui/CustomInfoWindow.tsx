import React from 'react';
import { InfoWindow, type InfoWindowProps } from '@react-google-maps/api';

interface Props extends InfoWindowProps {
  children?: React.ReactNode;
}

export function CustomInfoWindow({ children, ...InfoWindowProps }: Props) {
  const infoWindowOptions = {
    ...InfoWindowProps,
    options: {
      pixelOffset: new window.google.maps.Size(0, -25),
    },
  } as InfoWindowProps;

  return (
    <InfoWindow {...infoWindowOptions}>
      <>{children}</>
    </InfoWindow>
  );
}
