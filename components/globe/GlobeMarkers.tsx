import { useMemo } from 'react';
import type { GlobeCountryMarker } from '../../lib/types';
import { latLonToCartesian } from './geo';

interface GlobeMarkersProps {
  markers: GlobeCountryMarker[];
  onCountrySelect?: (countryCode: string) => void;
}

export function GlobeMarkers({ markers, onCountrySelect }: GlobeMarkersProps) {
  const positionedMarkers = useMemo(
    () =>
      markers.map((marker) => ({
        ...marker,
        position: latLonToCartesian(marker.latitude, marker.longitude, 1.035),
      })),
    [markers]
  );

  return (
    <>
      {positionedMarkers.map((marker) => (
        <mesh
          key={marker.id}
          position={marker.position}
          onClick={() => onCountrySelect?.(marker.countryCode)}
        >
          <sphereGeometry args={[marker.size ?? 0.014, 12, 12]} />
          <meshStandardMaterial
            color={marker.color ?? '#f5f8ff'}
            emissive={marker.color ?? '#d9e1ea'}
            emissiveIntensity={0.65}
            roughness={0.35}
            metalness={0.12}
          />
        </mesh>
      ))}
    </>
  );
}
