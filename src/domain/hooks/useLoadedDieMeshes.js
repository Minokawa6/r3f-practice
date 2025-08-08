import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useMemo } from "react";

/**
 * animatedDice: array of dice objects ({ sides, ... })
 * getModelBySides: (sides) => { modelImport, facePositions }
 */
export function useLoadedDiceMeshes(animatedDice, getModelBySides) {
  // Collect all unique GLTF imports from the dice list
  const modelImports = animatedDice
    .map((die) => getModelBySides(die.sides)?.modelImport)
    .filter(Boolean);

  const uniqueImports = [...new Set(modelImports)];

  // Load them all at once
  const gltfs = useLoader(GLTFLoader, uniqueImports);

  return useMemo(() => {
    const map = new Map();

    uniqueImports.forEach((imp, i) => {
      const meshes = [];

      gltfs[i].scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          meshes.push(child);
        }
      });

      // Only store if there are actual meshes
      if (meshes.length > 0) {
        map.set(imp, meshes);
      }
    });

    return map;
  }, [uniqueImports, gltfs]);
}
