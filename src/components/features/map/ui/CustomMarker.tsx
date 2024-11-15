import React from 'react';
import { Marker, type MarkerProps } from '@react-google-maps/api';

interface Props extends MarkerProps {
  children?: React.ReactNode;
}

export function CustomMarker({ children, ...markerProps }: Props) {
  const markerIcon = '/src/assets/images/bnl.png';

  const markerOptions = {
    ...markerProps,
    opacity: 1,
    icon: {
      anchor: {
        x: 55,
        y: 55,
      },
      url: markerIcon,
      scaledSize: {
        width: 100,
        height: 100,
      },
    },
  } as MarkerProps;

  return <Marker {...markerOptions}>{children}</Marker>;
}
