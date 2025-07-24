import {
  Suspense,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Box3, Vector3 } from "three";
import {
  modelPath,
  facePositions,
} from "../../data/3dDieSkins/GayumaDiceImport.js";

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

const GayumaD6 = forwardRef((props, ref) => {
  const model = useLoader(GLTFLoader, modelPath);

  const box = new Box3().setFromObject(model.scene);
  const center = new Vector3();
  box.getCenter(center);
  model.scene.position.sub(center);

  const diceRef = useRef();
  const [rolling, setRolling] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [spinOffset, setSpinOffset] = useState([0, 0, 0]);
  const duration = 2;

  const [targetRotation, setTargetRotation] = useState(facePositions.get(1));
  // facePositions[Math.floor(Math.random() * 6) + 1]

  function rollGayumaD6() {
    diceRef.current.position.y = 0;
    setRolling(true);
    setStartTime(performance.now() / 1000);
    const faceIndex = Math.floor(Math.random() * 6) + 1;
    setTargetRotation(facePositions.get(faceIndex));

    const spin = [
      (Math.random() * 0.5 + 2) * Math.PI * 2, // x
      (Math.random() * 0.5 + 2) * Math.PI * 2, // y
      Math.random() * Math.PI, // z
    ];
    setSpinOffset(spin);
  }

  useImperativeHandle(ref, () => ({
    rollGayumaD6,
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

export default function ThreeD() {
  const diceRef = useRef();

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">Title</h1> */}
      <div className="flex items-center justify-center h-screen w-screen ">
        <div className="flex flex-row justify-self-start w-[90vw] h-[90vh] bg-[url(/SpiritTray.png)] bg-no-repeat bg-contain bg-center relative">
          <Canvas className="absolute">
            <Suspense fallback={null}>
              <ambientLight intensity={0.9} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={0.9}
              />
              <pointLight
                position={[-10, -10, -10]}
                decay={0}
                intensity={0.9}
              />
              {/* <mesh>
                <boxGeometry position={[5, 0, 0]} />
                <meshStandardMaterial color="gray" />
              </mesh> */}
              <GayumaD6
                ref={diceRef}
                scale={1.5}
                rotation={facePositions.get(1)}
              />
              {/* <OrbitControls /> */}
            </Suspense>
          </Canvas>
          <button
            onClick={() => diceRef.current?.rollGayumaD6()}
            className="absolute bottom-4 left-4 px-4 py-2 bg-gray-400 rounded text-white font-semibold cursor-pointer hover:bg-gray-500"
          >
            Roll Die
          </button>
        </div>
      </div>
    </>
  );
}
