import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import easeInCubic from "../../domain/functions/easeInCubic";
import easeInExpo from "../../domain/functions/easeInExpo";
import { useLoadedDiceMeshes } from "../../domain/hooks/useLoadedDieMeshes";

export default function DiceGroup({ animatedDice, getModelBySides, columns }) {
  const spacing = 2.5;
  const diceRefs = useRef(new Map());
  const dummy = new THREE.Object3D();

  const diceMap = useLoadedDiceMeshes(animatedDice, getModelBySides);

  // Group dice by their model import path
  const diceByModel = useMemo(() => {
    const map = new Map();
    animatedDice.forEach((die, i) => {
      const skin = getModelBySides(die.sides);
      if (!skin?.modelImport) return;
      if (!map.has(skin.modelImport)) map.set(skin.modelImport, []);
      map.get(skin.modelImport).push({ die, index: i });
    });
    return map;
  }, [animatedDice, getModelBySides]);

  const getGridPosition = (i) => {
    const x = (i % columns) * spacing - ((columns - 1) * spacing) / 2;
    const z =
      Math.floor(i / columns) * spacing -
      ((Math.ceil(animatedDice.length / columns) - 1) * spacing) / 2;
    return [x, 0, z];
  };

  useFrame((state) => {
    const now = state.clock.getElapsedTime();

    diceByModel.forEach((diceList, modelImport) => {
      const instancedRef = diceRefs.current.get(modelImport);
      if (!instancedRef) return;

      diceList.forEach(({ die, index }, instanceIndex) => {
        const pos = getGridPosition(index);

        let height = 0;
        if (die.isRolling) {
          const elapsed = now - die.startTime;
          const t = Math.min(elapsed / 1.0, 1);
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

          dummy.rotation.set(
            die.targetRotation.x + die.spinOffset.x * (1 - t),
            die.targetRotation.y + die.spinOffset.y * (1 - t),
            die.targetRotation.z + die.spinOffset.z * (1 - t)
          );

          if (t >= 1) {
            die.isRolling = false;
            height = 0;
            dummy.rotation.set(
              die.targetRotation.x,
              die.targetRotation.y,
              die.targetRotation.z
            );
          }
        } else {
          dummy.rotation.set(
            die.targetRotation.x,
            die.targetRotation.y,
            die.targetRotation.z
          );
        }

        dummy.position.set(pos[0], height, pos[2]);
        dummy.updateMatrix();
        instancedRef.setMatrixAt(instanceIndex, dummy.matrix);
      });

      instancedRef.instanceMatrix.needsUpdate = true;
    });
  });

  return (
    <>
      {Array.from(diceByModel.entries()).map(([modelImport, diceList]) => {
        const meshes = diceMap.get(modelImport);
        if (!meshes || meshes.length === 0) return null;

        // Pick first mesh for instancing
        const mesh = meshes[0];

        return (
          <instancedMesh
            key={modelImport}
            args={[mesh.geometry, mesh.material, diceList.length]}
            ref={(ref) => {
              if (ref) diceRefs.current.set(modelImport, ref);
              else diceRefs.current.delete(modelImport);
            }}
          />
        );
      })}
    </>
  );
}
