import { useEffect, useState } from 'react';

import GoogleMaps from '../../shared/GoogleMaps.tsx';
import CustomMarker from '../../shared/CustomMarker.tsx';
import CustomInfoWindow from '../../shared/CustomInfoWindow.tsx';

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
            <CustomInfoWindow position={putMarker}>test</CustomInfoWindow>
          </CustomMarker>
        )}
      </GoogleMaps>
    </>
  );
}

export default MainMap;
