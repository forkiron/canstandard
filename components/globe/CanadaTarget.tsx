import { useMemo } from 'react';
import { latLonToCartesian } from './geo';

interface CanadaTargetProps {
  latitude: number;
  longitude: number;
  active?: boolean;
  onSelect?: () => void;
}

export function CanadaTarget({
  latitude,
  longitude,
  active = true,
  onSelect,
}: CanadaTargetProps) {
  const position = useMemo(
    () => latLonToCartesian(latitude, longitude, 1.045),
    [latitude, longitude]
  );

  return (
    <group position={position} onClick={onSelect}>
      <mesh>
        <sphereGeometry args={[0.018, 14, 14]} />
        <meshStandardMaterial
          color={active ? '#ffffff' : '#a7afba'}
          emissive={active ? '#f7fbff' : '#a7afba'}
          emissiveIntensity={active ? 0.8 : 0.2}
        />
      </mesh>
      <mesh scale={active ? 2.15 : 1.35}>
        <sphereGeometry args={[0.04, 18, 18]} />
        <meshBasicMaterial
          color="#f8fbff"
          transparent
          opacity={active ? 0.17 : 0.08}
        />
      </mesh>
    </group>
  );
}
