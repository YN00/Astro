import React, { useState } from 'react';
import { type MarkerProps } from '@react-google-maps/api';

import { Map } from '@widgets/map/ui/GoogleMaps.tsx';
import { CustomInfoWindow } from '@widgets/map/ui/CustomInfoWindow.tsx';
import { CustomMarker } from '@widgets/map/ui/CustomMarker.tsx';

import '@widgets/map/scss/map.scss';

interface Props {
  children?: React.ReactNode;
}

export function MainMap({ children }: Props) {
  const [putMarker, setPutMarker] = useState<MarkerProps['position'] | null>(
    null,
  );

  const onClickMap = (e: any) => {
    const position = e.latLng?.toJSON();
    setPutMarker(position);
  };

  const onClickPin = (e: any) => {
    console.log('test', e);
  };

  return (
    <Map onClickMap={onClickMap}>
      <>
        {putMarker && (
          <CustomMarker position={putMarker} onClick={onClickPin}>
            <CustomInfoWindow position={putMarker}>
              testtesttesttesttest
              {children}
            </CustomInfoWindow>
          </CustomMarker>
        )}
      </>
    </Map>
  );
}
