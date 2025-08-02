{
  /* <Canvas className="absolute" shadows>
            <Suspense fallback={null}>
              <ambientLight intensity={0.8} />
              <directionalLight
                castShadow
                position={[5, 5, 5]}
                intensity={1}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />

              Fill light (softens shadows from key light)
              <directionalLight
                position={[-5, 2, 5]}
                intensity={0.3}
                color="white"
              />

              Rim light (creates edge highlights)
              <spotLight
                position={[0, 5, -5]}
                intensity={0.4}
                angle={0.5}
                penumbra={1}
                decay={2}
                distance={50}
                color="#ffffff"
              />

              Optional: Backlight for extra depth
              <directionalLight
                position={[0, -5, -5]}
                intensity={0.2}
                color="lightblue"
              />

              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={1}
              />
              <pointLight position={[-10, -10, -10]} decay={0} intensity={1} />

              <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={25} />

              <mesh>
                <sphereGeometry position={[0, 0, 0]} />
                <meshStandardMaterial color="gray" />
              </mesh>
              <GayumaD6
                ref={diceRef}
                scale={3}
                rotation={gayumaD6.threeDD6.facePositions.get(1)}
              />
              <TestDiceD20 scale={100} />

              <OrbitControls />
              <GayumaDiceSet />
            </Suspense>
          </Canvas>
          <button
            onClick={() => diceRef.current?.rollGayumaD6()}
            className="absolute bottom-4 left-4 px-4 py-2 bg-gray-400 rounded text-white font-semibold cursor-pointer hover:bg-gray-500"
          >
            Roll Die
          </button> */
}
