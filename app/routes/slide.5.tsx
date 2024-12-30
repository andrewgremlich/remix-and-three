import { useLoaderData } from "@remix-run/react";
import { Code } from "summit-kit";

import { Layout } from "@/Layout";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle={"Basic setup"} currentSlide={number}>
			<Code
				text={`import type * as THREE from "three";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useRef } from "react";

export default function App() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
   //...
  });

  return (
  <Canvas style={{ height: "400px", width: "80vw" }}>
			<ambientLight intensity={Math.PI / 2} />
			<spotLight
				position={[10, 10, 10]}
				angle={0.15}
				penumbra={1}
				decay={0}
				intensity={Math.PI}
			/>
			<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <mesh ref={ref}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
      </mesh>
  </Canvas>
  );
}`}
			/>
		</Layout>
	);
}
