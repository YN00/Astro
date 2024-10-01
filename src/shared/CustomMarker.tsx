import { Marker } from '@react-google-maps/api';

interface Props {
  position: { lat: number; lng: number };
}

function CustomMarker({ position }: Props) {
  return <Marker position={position} />;
}

export default CustomMarker;
