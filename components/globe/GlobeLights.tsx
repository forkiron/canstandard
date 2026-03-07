export function GlobeLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[2.4, 2, 3]} intensity={0.95} color="#e6ebf2" />
      <directionalLight position={[-2.8, -1.8, -2.8]} intensity={0.28} color="#7d8590" />
      <pointLight position={[0, 0, 2.8]} intensity={0.22} color="#f7fbff" />
    </>
  );
}
