// import type * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";

export const Lighting = () => {
	// const pointLightRef = useRef<THREE.PointLight>(null);

	// useFrame((state, delta) => {
	// 	if (!pointLightRef.current) return;

	// 	pointLightRef.current.rotation.x += delta;
	// 	pointLightRef.current.rotation.y += delta;
	// });

	return (
		<>
			<ambientLight intensity={Math.PI} />
			<spotLight
				position={[10, 10, 10]}
				angle={0.15}
				penumbra={1}
				decay={0}
				intensity={Math.PI}
			/>
			<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
		</>
	);
};
