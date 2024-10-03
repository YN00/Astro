import { useEffect, useState } from 'react';

import GoogleMaps from '../../shared/GoogleMaps.tsx';
import CustomMarker from '../../shared/CustomMarker.tsx';

interface Props {
  mapKey: string;
}

function MainMap({ mapKey }: Props) {
  const [putMarker, setPutMarker] = useState(null);

  const onClickMap = (e: any) => {
    const position = e.latLng?.toJSON();
    setPutMarker(position);
  };

  return (
    <>
      <GoogleMaps mapKey={mapKey} onClickMap={onClickMap}>
        {putMarker && <CustomMarker position={putMarker} />}
      </GoogleMaps>
    </>
  );
}

export default MainMap;
