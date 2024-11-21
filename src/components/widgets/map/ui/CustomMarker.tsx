import React from 'react';
import { Marker, type MarkerProps } from '@react-google-maps/api';

interface Props extends MarkerProps {
  children?: React.ReactNode;
}

export function CustomMarker({ children, ...markerProps }: Props) {
  const markerOptions = {
    ...markerProps,
    opacity: 1,
    icon: {
      anchor: {
        x: 55,
        y: 55,
      },
      url: '/img/bnl.png',
      scaledSize: {
        width: 100,
        height: 100,
      },
    },
  } as MarkerProps;

  return <Marker {...markerOptions}>{children}</Marker>;
}
