import { Canvas } from "@react-three/fiber";

import { useState, Suspense, useEffect } from "react";
import useThreeDDiceRenderer from "../hooks/useThreeDDiceRenderer";
import DiceGroup from "./DiceGroup";
import LightingCamSettings from "./LightingCamSettings";

export default function ThreeDDieComponent() {
  const { dieMeshes, rollAllDice, getModelBySides } = useThreeDDiceRenderer();
  const [columns, setColumns] = useState(3);

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
  console.log(dieMeshes);
  return (
    <Canvas>
      <Suspense>
        <LightingCamSettings />
        <DiceGroup
          animatedDice={dieMeshes}
          getModelBySides={getModelBySides}
          columns={columns}
        />
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
