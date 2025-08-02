import { useState } from "react";
import Die from "../../domain/objects/Die";

export function useDiceHandler() {
  const [dice, setDice] = useState([new Die(20)]);
  const [isRolling, setIsRolling] = useState(false);

  const handleAddDie = (dieType) => {
    const newDie = new Die(dieType);
    setDice([...dice, newDie]);
  };
  const handleRemoveDie = (index) => {
    const newDieArray = [...dice];
    newDieArray.splice(index, 1);
    setDice(newDieArray);
  };

  const handleRollDice = () => {
    return new Promise((resolve) => {
      if (isRolling) return resolve();

      setIsRolling(true);

      const updatedDice = dice.map((die) => {
        const clonedDie = Object.assign(
          Object.create(Object.getPrototypeOf(die)),
          die
        );
        clonedDie.roll();
        return clonedDie;
      });

      setDice(updatedDice);

      setTimeout(() => {
        setIsRolling(false);
        resolve(updatedDice);
      }, 0);
    });
  };

  const handleResetDice = () => {
    setDice([]);
  };

  return {
    dice,
    isRolling,
    setIsRolling,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  };
}
