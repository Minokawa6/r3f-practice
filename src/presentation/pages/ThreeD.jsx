import {
  Suspense,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Box3, BoxHelper, Vector3 } from "three";
import { gayuma } from "../../assets/threeDDieSkins/GayumaDiceImport.js";
import ThreeDDieComponent from "../components/ThreeDDieComponent.jsx";

function easeInQuart(x) {
  return Math.pow(x, 4);
}
function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}
function easeInExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
function easeInCubic(x) {
  return x * x * x;
}

const Gayumagayuma = forwardRef((props, ref) => {
  const model = useLoader(GLTFLoader, gayuma.threeDgayuma.modelImport);

  // const box = new Box3().setFromObject(model.scene);
  // const center = new Vector3();
  // box.getCenter(center);
  // model.scene.position.sub(center);

  const diceRef = useRef();
  const [rolling, setRolling] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [spinOffset, setSpinOffset] = useState([0, 0, 0]);
  const duration = 2;

  const [targetRotation, setTargetRotation] = useState(
    gayuma.threeDgayuma.facePositions.get(1)
  );
  // gayuma.threeDgayuma.facePositions[Math.floor(Math.random() * 6) + 1]

  function rollGayumagayuma() {
    diceRef.current.position.y = 0;
    setRolling(true);
    setStartTime(performance.now() / 1000);
    const faceIndex = Math.floor(Math.random() * 6) + 1;
    setTargetRotation(gayuma.threeDgayuma.facePositions.get(faceIndex));

    const spin = [
      (Math.random() * 0.5 + 2) * Math.PI * 2, // x
      (Math.random() * 0.5 + 2) * Math.PI * 2, // y
      Math.random() * Math.PI, // z
    ];
    setSpinOffset(spin);
  }

  useImperativeHandle(ref, () => ({
    rollGayumagayuma,
  }));

  useFrame((state) => {
    if (!rolling || !diceRef.current) return;

    const now = state.clock.getElapsedTime();
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);

    let height = 0;

    const liftDuration = 0.2;
    const holdDuration = 0.1;
    const dropDuration = 0.7;

    if (t < liftDuration) {
      const progress = t / liftDuration;
      height = Math.max(0, easeInExpo(progress) * 2);
    } else if (t < liftDuration + holdDuration) {
      height = 2;
    } else {
      const progress = (t - liftDuration - holdDuration) / dropDuration;
      height = (1 - easeInCubic(progress)) * 2;
    }

    diceRef.current.position.y = height;

    diceRef.current.rotation.x = targetRotation[0] + spinOffset[0] * (1 - t);
    diceRef.current.rotation.y = targetRotation[1] + spinOffset[1] * (1 - t);
    diceRef.current.rotation.z = targetRotation[2] + spinOffset[2] * (1 - t);

    if (t >= 1) {
      setRolling(false);
      diceRef.current.position.y = 0;
      diceRef.current.rotation.set(
        targetRotation[0],
        targetRotation[1],
        targetRotation[2]
      );
    }
  });

  return <primitive ref={diceRef} object={model.scene} {...props} />;
});

function GayumaDiceSet(props) {
  const models = useLoader(GLTFLoader, "/GayumaTexturesReworked.glb");
  const { nodes, materials, scene } = useGLTF("/GayumaTexturesReworked.glb");
  console.log(nodes);

  const d4 = scene.getObjectByName("polySurface1_1");
  const gayuma = scene.getObjectByName("polySurface2");

  return (
    <group {...props}>
      <primitive object={d4} position={[2, 0, 0]}></primitive>
      <primitive object={gayuma} position={[4, 0, 0]}></primitive>
    </group>
  );
}
function TestDiceD20(props) {
  const model = useLoader(GLTFLoader, gayuma.threeDD20.modelImport);
  const objectRef = useRef();
  const helperRef = useRef();

  useEffect(() => {
    if (objectRef.current && helperRef.current) {
      helperRef.current.update();
    }
  }, [model]);

  const box = new Box3().setFromObject(model.scene);
  const center = new Vector3();
  box.getCenter(center);
  model.scene.position.sub(center);

  return (
    <>
      <primitive
        ref={objectRef}
        object={model.scene}
        rotation={[Math.PI / 2, Math.PI / 1.3333, -Math.PI / 1.11]}
        position={[0, 0, 0]}
        {...props}
      ></primitive>
      <primitive
        ref={helperRef}
        object={new BoxHelper(model.scene, 0xff0000)}
      ></primitive>
    </>
  );
}

export default function ThreeD() {
  const diceRef = useRef();

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">Title</h1> */}
      <div className="flex items-center justify-center h-screen w-screen ">
        <div className="flex flex-row justify-self-start w-[90vw] h-[90vh] bg-[url(/SpiritTray.png)] bg-no-repeat bg-contain bg-center relative">
          <ThreeDDieComponent />
        </div>
      </div>
    </>
  );
}
