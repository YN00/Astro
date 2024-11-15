import { useState } from 'react';
import { type MarkerProps } from '@react-google-maps/api';
import { Map, CustomInfoWindow, CustomMarker } from '../../features/map';
import './css/map.css';

interface Props {
  mapKey: string;
}

function MainMap({ mapKey }: Props) {
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
    <Map mapKey={mapKey} onClickMap={onClickMap}>
      <>
        {putMarker && (
          <CustomMarker position={putMarker} onClick={onClickPin}>
            <CustomInfoWindow position={putMarker}>
              testtesttesttesttest
            </CustomInfoWindow>
          </CustomMarker>
        )}
      </>
    </Map>
  );
}

export default MainMap;
