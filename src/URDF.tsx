import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'
import {
  Mesh,
  Box3,
  Object3D,
  LoadingManager
} from 'three';
import URDFLoader, { URDFRobot } from "urdf-loader";

type MeshProps = JSX.IntrinsicElements["mesh"];
type ChildrenProps = {
  children?: ReactNode
}
type PropsWithChildren = MeshProps | ChildrenProps;

const URDF: FC<PropsWithChildren> = (props) => {
  const ref = useRef<Mesh>({} as Mesh);

  useEffect(() => {
    const manager = new LoadingManager();
    const loader = new URDFLoader(manager);

    // const url = 'http://localhost:3000/resources/urdf/T12/urdf/T12_flipped.URDF';
    const url = 'https://raw.githubusercontent.com/gkjohnson/urdf-loaders/master/urdf/T12/urdf/T12_flipped.URDF'
    let robot: URDFRobot;
    loader.load(url, result => {
      robot = result;
    });

    const loadURDF = () => {
      return new Promise<Object3D>((resolve, reject) => {
        manager.onLoad = () => {
          robot.rotation.x = Math.PI / 2;
          robot.traverse(c => {
              c.castShadow = true;
          });

          robot.updateMatrixWorld(true);

          const bb = new Box3();
          bb.setFromObject(robot);

          robot.position.y -= bb.min.y;

          resolve(robot);
        }

        manager.onError = (url: string) => {
          reject(`Failed to add Robot. url: ${url}`);
        }
      });
    };

    const f = async () => {
      const result = await loadURDF();
      ref.current.add(result);
    }

    f();

  }, []);

  return (
    <mesh {...props} ref={ref} />
  );
};

export default URDF;
