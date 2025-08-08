import { Canvas } from "@react-three/fiber";

import { useState, Suspense, useEffect } from "react";
import useThreeDDiceRenderer from "../hooks/useThreeDDiceRenderer";
import DiceGroup from "./DiceGroup";
import LightingCamSettings from "./LightingCamSettings";
import { OrbitControls } from "@react-three/drei";

export default function ThreeDDieComponent() {
  const { dieMeshes, rollAllDice, getModelBySides } = useThreeDDiceRenderer();
  const [columns, setColumns] = useState(3);

  const gridCenterX = (columns - 1) / 2;
  const gridCenterZ = Math.ceil(dieMeshes.length / columns) / 2;

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 500) setColumns(2);
      else if (width < 800) setColumns(3);
      else setColumns(4);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Canvas>
      <Suspense fallback={null}>
        <LightingCamSettings
          gridCenterX={gridCenterX}
          gridCenterZ={gridCenterZ}
        />
        <DiceGroup
          animatedDice={dieMeshes}
          getModelBySides={getModelBySides}
          columns={columns}
        />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
{
  /* <button
        onClick={rollAllDice}
        className="mt-4 px-6 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
      >
        Roll All Dice
      </button> */
}
