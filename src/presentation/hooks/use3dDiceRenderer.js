import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { modelPath } from "../../data/3dDieSkins/GayumaDiceImport";

export default function use3dDiceRenderer() {
  const model = useLoader(GLTFLoader, modelPath);
}
