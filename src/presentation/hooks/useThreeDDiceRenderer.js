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

    setAnimatedDice((prev) => {
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
      4: threeDDieSkin.d4,
      6: threeDDieSkin.d6,
      8: threeDDieSkin.d8,
      10: threeDDieSkin.d10,
      12: threeDDieSkin.d12,
      20: threeDDieSkin.d20,
      100: threeDDieSkin.d100,
    };
    return map[sides] || threeDDieSkin.d20;
  };

  return { dieMeshes, getModelBySides, rollAllDice };
}
