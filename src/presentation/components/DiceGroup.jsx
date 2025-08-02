import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import { useRef } from "react";
import easeInCubic from "../../domain/functions/easeInCubic";
import easeInExpo from "../../domain/functions/easeInExpo";

const useLoadedModels = (animatedDice, getModelBySides) => {
  const modelImports = animatedDice
    .map((die) => getModelBySides(die.sides)?.modelImport)
    .filter(Boolean); // Filter out undefined

  const uniqueImports = [...new Set(modelImports)];
  const gltfs = useLoader(GLTFLoader, uniqueImports);

  return new Map(uniqueImports.map((imp, i) => [imp, gltfs[i]]));
};
export default function DiceGroup({ animatedDice, getModelBySides, columns }) {
  const spacing = 2.5;
  const dieRefs = useRef([]);
  const getGridPosition = (i) => {
    const x = (i % columns) * spacing;
    const z = Math.floor(i / columns) * spacing;
    return [x, 0, z];
  };

  const loadedModels = useLoadedModels(animatedDice, getModelBySides);

  useFrame((state) => {
    const now = state.clock.getElapsedTime();

    animatedDice.forEach((die, i) => {
      const obj = dieRefs.current[i];
      if (!obj || !die.isRolling) return;

      const elapsed = now - die.startTime;
      const t = Math.min(elapsed / 1.0, 1);

      let height = 0;
      const liftDuration = 0.2;
      const holdDuration = 0.1;
      const dropDuration = 0.7;

      if (t < liftDuration) {
        height = easeInExpo(t / liftDuration) * 2;
      } else if (t < liftDuration + holdDuration) {
        height = 2;
      } else {
        const p = (t - liftDuration - holdDuration) / dropDuration;
        height = (1 - easeInCubic(p)) * 2;
      }

      obj.position.y = height;

      obj.rotation.x = die.targetRotation.x + die.spinOffset.x * (1 - t);
      obj.rotation.y = die.targetRotation.y + die.spinOffset.y * (1 - t);
      obj.rotation.z = die.targetRotation.z + die.spinOffset.z * (1 - t);

      if (t >= 1) {
        die.isRolling = false;
        obj.position.y = 0;
        obj.rotation.set(
          die.targetRotation.x,
          die.targetRotation.y,
          die.targetRotation.z
        );
      }
    });
  });
  return (
    <>
      {animatedDice.map((die, index) => {
        const skin = getModelBySides(die.sides);
        if (!skin || !skin.modelImport) return null;

        const model = loadedModels.get(skin.modelImport);
        if (!model || !model.scene) return null;
        console.log(model);
        const position = getGridPosition(index);
        return (
          <primitive
            key={die.id}
            object={model.scene.clone()}
            ref={(ref) => {
              if (ref) dieRefs.current[index] = ref;
            }}
            position={position}
            scale={20}
          />
        );
      })}
    </>
  );
}
