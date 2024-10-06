import { InfoWindow } from '@react-google-maps/api';
import React from 'react';

interface Props {
  position: { lat: number; lng: number };
  children?: React.ReactNode;
}

function CustomInfoWindow({ position, children }: Props) {
  return (
    <InfoWindow position={position}>
      <>{children}</>
    </InfoWindow>
  );
}

export default CustomInfoWindow;
