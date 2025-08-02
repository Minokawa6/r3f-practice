import { createContext } from "react";
import { useDiceHandler } from "../hooks/useDiceHandler";
import Die from "../../domain/objects/Die";

export const DieContext = createContext([new Die(20)]);

export function DieProvider({ children }) {
  const {
    dice,
    isRolling,
    setIsRolling,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  } = useDiceHandler();
  return (
    <DieContext.Provider
      value={{
        dice,
        isRolling,
        setIsRolling,
        handleAddDie,
        handleRemoveDie,
        handleRollDice,
        handleResetDice,
      }}
    >
      {children}
    </DieContext.Provider>
  );
}
