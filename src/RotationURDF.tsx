import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'
import {
  Mesh,
  Box3,
  Object3D,
  LoadingManager
} from 'three';
import URDFLoader, { URDFRobot } from "urdf-loader";

import ForwardURDF from './ForwardURDF';

const RotationURDF: FC = () => {
  const ref = useRef<Mesh>({} as Mesh);

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <ForwardURDF
      ref={ref}
      position={[-1, 0, -1]}
      castShadow
    />
  );
};

export default RotationURDF;
