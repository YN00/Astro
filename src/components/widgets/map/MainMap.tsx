import { useEffect, useState } from 'react';
import { GoogleMaps, CustomInfoWindow, CustomMarker } from '../../features/map';

interface Props {
  mapKey: string;
}

function MainMap({ mapKey }: Props) {
  const [putMarker, setPutMarker] = useState(null);

  const onClickMap = (e: any) => {
    const position = e.latLng?.toJSON();
    setPutMarker(position);
  };

  const onClickPin = () => {
    console.log('test');
  };

  return (
    <>
      <GoogleMaps mapKey={mapKey} onClickMap={onClickMap}>
        {putMarker && (
          <CustomMarker position={putMarker} onClick={onClickPin}>
            <CustomInfoWindow position={putMarker}>
              testtesttesttesttest
            </CustomInfoWindow>
          </CustomMarker>
        )}
      </GoogleMaps>
    </>
  );
}

export default MainMap;
