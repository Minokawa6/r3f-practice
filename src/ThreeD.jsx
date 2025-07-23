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

function easeInQuart(x) {
  return Math.pow(x, 4);
}

const GayumaD6 = forwardRef((props, ref) => {
  const model = useLoader(GLTFLoader, "/DiceGayuma2.glb");
  const diceRef = useRef();
  const [rolling, setRolling] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const duration = 2;

  const [targetRotation, setTargetRotation] = useState([0, 0, 0]);

  function rollGayumaD6() {
    setRolling(true);
    setStartTime(performance.now() / 1000);
    setTargetRotation([
      Math.PI * (1 + Math.floor(Math.random() * 4)),
      Math.PI * (1 + Math.floor(Math.random() * 4)),
      Math.PI * (1 + Math.floor(Math.random() * 4)),
    ]);
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

    const liftDuration = 0.1;
    const holdDuration = 0.2;
    const dropDuration = 0.7;

    if (t < liftDuration) {
      const progress = t / liftDuration;
      height = easeInQuart(progress) * 2;
    } else if (t < liftDuration + holdDuration) {
      height = 2;
    } else {
      const progress = (t - liftDuration - holdDuration) / dropDuration;
      height = (1 - easeInQuart(progress)) * 2;
    }

    diceRef.current.position.y = height;

    diceRef.current.rotation.x = targetRotation[0] * t;
    diceRef.current.rotation.y = targetRotation[1] * t;
    diceRef.current.rotation.z = targetRotation[2] * t;

    if (t >= 1) {
      setRolling(false);
      diceRef.current.position.y = 0;
    }
  });

  return <primitive ref={diceRef} object={model.scene} {...props} />;
});

export default function ThreeD() {
  const diceRef = useRef();

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">Title</h1> */}
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="bg-gray-300 w-[90vw] h-[50vh]">
          <Canvas className="">
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
              <GayumaD6 ref={diceRef} />
              <OrbitControls />
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
