import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import D6 from "./assets/dice_low_and_high_poly/D6";
export default function ThreeD() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Title</h1>
      <Canvas className="">
        <Suspense fallback={null}>
          <D6 />
        </Suspense>
      </Canvas>
    </>
  );
}
