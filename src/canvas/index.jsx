import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import * as THREE from "three";
import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

const CanvasModel = () => {
  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      camera={{ position: [0, 0, 2.5], fov: 25 }}
      gl={{
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        antialias: false,
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          console.warn("WebGL context lost");
        });
        gl.domElement.addEventListener("webglcontextrestored", () => {
          console.warn("WebGL context restored");
        });
      }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};
export default CanvasModel;
