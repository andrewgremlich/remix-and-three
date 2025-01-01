import { useLoaderData } from "@remix-run/react";
import { Code, Section, H2 } from "summit-kit";

import { Layout } from "@/Layout";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle={"Basic Setup"} currentSlide={number}>
			<Section>
				<H2>Three.js</H2>
				<Code
					text={`import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}`}
				/>
			</Section>
			<Section>
				<H2>Fiber</H2>

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
			</Section>
		</Layout>
	);
}
