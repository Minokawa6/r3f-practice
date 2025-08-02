import { createContext } from "react";
import ThreeDDieSkin from "../../domain/objects/ThreeDDieSkin";
import { useHandleThreeDDieSkin } from "../../domain/hooks/useHandleThreeDDieSkin";
import { gayuma } from "../../assets/threeDDieSkins/GayumaDiceImport";

export const ThreeDDieSkinContext = createContext(gayuma);

export function ThreeDDieSkinProvider({ children }) {
  const { threeDDieSkin, selectSkin } = useHandleThreeDDieSkin();
  return (
    <ThreeDDieSkinContext.Provider value={{ threeDDieSkin, selectSkin }}>
      {children}
    </ThreeDDieSkinContext.Provider>
  );
}
