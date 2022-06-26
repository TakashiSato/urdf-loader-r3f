import { FC, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three';

const Box: FC = () => {
  const ref = useRef<Mesh>({} as Mesh);
  const [isHovered, setIsHovered] = useState(false)

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      position={[2, 2, -1]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      castShadow
      receiveShadow
    >
      <boxBufferGeometry args={isHovered ? [1.2, 1.2, 1.2] : [1.0, 1.0, 1.0]} />
      <meshLambertMaterial color={isHovered ? 0x44c2b5 : 0x9178e6} />
    </mesh>
  )
}

export default Box;
