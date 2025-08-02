import { useState } from "react";
import { gayuma } from "../../assets/threeDDieSkins/GayumaDiceImport";

export function useHandleThreeDDieSkin() {
  const [threeDDieSkin, setThreeDDieSkin] = useState(gayuma);
  const selectSkin = (skin) => {
    setThreeDDieSkin(skin);
  };
  return { threeDDieSkin, selectSkin };
}
