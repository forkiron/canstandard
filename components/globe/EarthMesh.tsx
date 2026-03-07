export function EarthMesh() {
  return (
    <group>
      <mesh scale={1.004}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#eef4ff"
          wireframe
          transparent
          opacity={0.1}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.018}>
        <sphereGeometry args={[1, 80, 80]} />
        <meshBasicMaterial
          color="#f8fbff"
          wireframe
          transparent
          opacity={0.05}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
