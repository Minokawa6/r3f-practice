import { OrthographicCamera } from "@react-three/drei";

export default function LightingCamSettings({ gridCenterX, gridCenterZ }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        castShadow
        position={[5, 5, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Fill light (softens shadows from key light) */}
      <directionalLight position={[-5, 2, 5]} intensity={0.3} color="white" />
      {/* Rim light (creates edge highlights) */}
      <spotLight
        position={[0, 5, -5]}
        intensity={0.4}
        angle={0.5}
        penumbra={1}
        decay={2}
        distance={50}
        color="#ffffff"
      />
      {/* Optional: Backlight for extra depth */}
      <directionalLight
        position={[0, -5, -5]}
        intensity={0.2}
        color="lightblue"
      />
      <OrthographicCamera
        makeDefault
        position={[gridCenterX, 20, gridCenterZ]} // Height = 20 units above
        rotation={[-Math.PI / 2, 0, 0]} // Look straight down
        zoom={50} // Adjust zoom as needed
      />
    </>
  );
}
