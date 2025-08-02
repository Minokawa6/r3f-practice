import { useState, useContext, useEffect } from "react";
import { DieContext } from "../context/DieProvider";
import { DieSkinContext } from "../context/DieSkinProvider";

export function useDiceRenderer() {
  const { getDieAssets } = useContext(DieSkinContext);
  const { dice, handleRollDice, isRolling, setIsRolling } =
    useContext(DieContext);

  const [currentDieFaces, setCurrentDieFaces] = useState([]);

  useEffect(() => {
    const updatedFaces = dice.map((die) => {
      const dieType = die.getDieType();
      const dieAssets = getDieAssets(dieType);
      const faceImgs = dieAssets.slice(0, -3);
      const face = faceImgs[die.getDieValue()];
      return [face, dieType];
    });
    setCurrentDieFaces(updatedFaces);
  }, [dice, getDieAssets]);

  const updateDieFaces = () => {
    const collectDieFaces = dice.map((die) => {
      let dieType = die.getDieType();
      let dieAssets = getDieAssets(die.getDieType());
      let faceImgs = dieAssets.slice(0, -3);
      let face = faceImgs[die.getDieValue()];
      return [face, dieType];
    });
    setCurrentDieFaces(collectDieFaces);
  };

  const triggerDiceRolls = () => {
    return new Promise((resolve) => {
      if (isRolling || dice.length === 0) return resolve();
      setIsRolling(true);
      const diceWithSkins = dice.map((die) => {
        let dieType = die.getDieType();
        let dieAssets = getDieAssets(dieType);
        let faceImgs = dieAssets.slice(0, -3);
        let cornerImgs = dieAssets.slice(-3);
        return [dieType, faceImgs, cornerImgs];
      });

      let frame = 0;
      const maxFrames = 20;
      const initialDelayFrames = 5;
      let lastUpdateTime = 0;

      function getFrameDuration(frame) {
        return 30 + frame * 10;
      }

      function step(timestamp) {
        if (!lastUpdateTime) lastUpdateTime = timestamp;
        const elapsed = timestamp - lastUpdateTime;
        const duration = getFrameDuration(frame);

        if (elapsed >= duration) {
          const rollingDieFrames = diceWithSkins.map(
            ([dieType, faceImgs, cornerImgs]) => {
              const randomCorner = () =>
                cornerImgs[Math.floor(Math.random() * cornerImgs.length)];
              const randomFace = () => {
                const rollIndex = Math.floor(Math.random() * dieType);
                return dieType === 100
                  ? faceImgs[rollIndex % 10]
                  : faceImgs[rollIndex];
              };
              const rolledDieFrame =
                frame % 2 === 0 ? randomCorner() : randomFace();
              return [rolledDieFrame, dieType];
            }
          );

          setCurrentDieFaces([...rollingDieFrames]);
          frame++;
          lastUpdateTime = timestamp;
        }
        if (frame < maxFrames) {
          requestAnimationFrame(step);
        } else {
          handleRollDice().then((rolledDice) => {
            updateDieFaces();
            setIsRolling(false);
            resolve(rolledDice);
          });
        }
      }

      requestAnimationFrame(step);
    });
  };

  return {
    currentDieFaces,
    updateDieFaces,
    triggerDiceRolls,
  };
}
