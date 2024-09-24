---
import { GOOGLE_MAP_KEY } from 'astro:env/client';
import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
  zIndex: 1,
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

interface GoogleMapsProps {
  mapKey: string;
  children?: React.ReactNode;
}

const { isLoaded } = useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: GOOGLE_MAP_KEY,
  language: 'ko',
  libraries: ['geocoding', 'geometry'],
});

const [map, setMap] = useState(null);

const onLoad = useCallback(function callback(map: any) {
  const bounds = new window.google.maps.LatLngBounds(center);
  map.fitBounds(bounds);

  setMap(map);
}, []);

const onUnmount = useCallback(function callback() {
  setMap(null);
}, []);
---
{!isLoaded && <></>}

{isLoaded && <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={3}
    onLoad={onLoad}
    onUnmount={onUnmount}
    options={{
      minZoom: 3,
      streetView: null,
      disableDefaultUI: true,
    }}
>
  <slot />
  <Marker position={center}/>
</GoogleMap>
}

<script>

</script>
