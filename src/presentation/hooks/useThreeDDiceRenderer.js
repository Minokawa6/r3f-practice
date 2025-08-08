import { useContext, useState, useEffect } from "react";
import * as THREE from "three";
import { DieContext } from "../context/DieProvider";
import { ThreeDDieSkinContext } from "../context/ThreeDDieSkinProvider";

export default function useThreeDDiceRenderer() {
  const { dice } = useContext(DieContext);
  const { threeDDieSkin, selectSkin } = useContext(ThreeDDieSkinContext);

  const [dieMeshes, setDieMeshes] = useState([]);

  useEffect(() => {
    setDieMeshes(
      dice.map((die) => ({
        id: crypto.randomUUID?.() || Math.random().toString(36),
        sides: die.getDieType(),
        targetRotation: new THREE.Euler(),
        spinOffset: new THREE.Euler(),
        startTime: 0,
        isRolling: false,
      }))
    );
  }, [dice]);

  const rollAllDice = () => {
    const now = performance.now() / 1000;

    dice.forEach((d) => d.roll());

    setDieMeshes((prev) => {
      prev.map((die) => ({
        ...die,
        targetRotation: new THREE.Euler(
          Math.PI * 2 * Math.floor(Math.random() * 4),
          Math.PI * 2 * Math.floor(Math.random() * 4),
          Math.PI * 2 * Math.floor(Math.random() * 4)
        ),
        spinOffset: new THREE.Euler(
          Math.PI * 6 * (Math.random() + 1),
          Math.PI * 6 * (Math.random() + 1),
          Math.PI * 6 * (Math.random() + 1)
        ),
        startTime: now,
        isRolling: true,
      }));
    });
  };

  const getModelBySides = (sides) => {
    if (!threeDDieSkin) return null;
    const map = {
      4: threeDDieSkin.threeDD4,
      6: threeDDieSkin.threeDD6,
      8: threeDDieSkin.threeDD8,
      10: threeDDieSkin.threeDD10,
      12: threeDDieSkin.threeDD12,
      20: threeDDieSkin.threeDD20,
      100: threeDDieSkin.threeDD100,
    };
    return map[sides] || threeDDieSkin.d20;
  };

  return { dieMeshes, getModelBySides, rollAllDice };
}
