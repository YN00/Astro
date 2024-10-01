import React, { useState, useCallback, memo, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 0,
  lng: 0,
};

const worldBounds = {
  north: 85, // 북쪽 경계 (북극 근처)
  south: -85, // 남쪽 경계 (남극 근처)
  east: 180, // 동쪽 경계 (180도)
  west: -180, // 서쪽 경계 (-180도)
};

interface GoogleMapsProps {
  mapKey: string;
  children?: React.ReactNode;
}

function GoogleMaps({ mapKey, children }: GoogleMapsProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapKey,
    language: 'ko',
    libraries: ['geocoding', 'geometry', 'visualization', 'drawing', 'places'],
  });

  const [map, setMap] = useState(null);
  const [putMarker, setPutMarker] = useState<typeof center | null>(null);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <></>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={(e) => {
        setPutMarker(e.latLng?.toJSON());
      }}
      options={{
        zoom: 5,
        minZoom: 3,
        streetView: null,
        disableDefaultUI: true,
        restriction: {
          latLngBounds: worldBounds, // 지정된 영역
          strictBounds: false, // 엄격한 제한 적용
        },
      }}
    >
      {children}

      {putMarker && <Marker position={putMarker} />}

      <Marker position={center} />
    </GoogleMap>
  );
}

export default memo(GoogleMaps);
