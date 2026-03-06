import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);

  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  useEffect(() => {
    return () => {
      logoTexture?.dispose();
    };
  }, [logoTexture]);

  useEffect(() => {
    return () => {
      fullTexture?.dispose();
    };
  }, [fullTexture]);
  useFrame((_, delta) => {
    if (materials?.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

  if (!nodes?.T_Shirt_male || !materials?.lambert1) return null;

  return (
    <group scale={1}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={true}
            depthWrite={true}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        )}
      </mesh>
    </group>
  );
};

useGLTF.preload("/shirt_baked.glb");

export default Shirt;
