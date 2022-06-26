import { FC, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Stage, useHelper } from '@react-three/drei'
import Box from './Box';
import {
  DoubleSide,
  DirectionalLight,
  DirectionalLightHelper,
  MeshStandardMaterial
} from 'three';

import URDF from './URDF';
import RotationURDF from './RotationURDF';


const DrawCanvas: FC = () => {
  return (
    <Suspense fallback={<span>loading...</span>}>
      <Canvas
        camera={{ fov: 50, position: [0, 3, 10] }}
        shadows
      >
        <Contents/>
      </Canvas>
    </Suspense>
  );
}

const Contents: FC = () => {
  const lightRef = useRef<DirectionalLight>({} as DirectionalLight)
  useHelper(lightRef, DirectionalLightHelper);

  return (
    <>
      {/* <PerspectiveCamera makeDefault /> */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

      <directionalLight
        ref={lightRef}
        position={[5, 5, 2]}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />

      {/* <RotationURDF /> */}

      <URDF
        position={[-1, 0, -1]}
        castShadow>
        <meshLambertMaterial color="blue" />
        <boxGeometry args={[1, 1, 1]} />
      </URDF>

      <Box/>

      {/* box 1 */}
      <mesh position={[0, 2, 1]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhongMaterial color="blue" />
      </mesh>

      {/* box 2 */}
      <mesh position={[1, 3, 2]} scale={0.5} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhongMaterial color="red" />
      </mesh>

      {/* floor */}
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#E5E5E5" side={DoubleSide} />
      </mesh>
      {/* <ambientLight intensity={0.5} /> */}
      {/* <Stage>
        <Box/>
      </Stage> */}

      <gridHelper position={[0, 0.01, 0]} args={[20, 20, 'red', '#4C4C4C']} />

    </>
  );
}

export default DrawCanvas;
