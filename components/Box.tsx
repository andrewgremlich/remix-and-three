import * as THREE from "three";
import { useFrame, ThreeElements } from "@react-three/fiber";
import { useRef, useState } from "react";

export function Box(props: ThreeElements["mesh"]) {
	const ref = useRef<THREE.Mesh>(null!);
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);

	useFrame((state, delta) => {
		if (!ref.current) return;

		ref.current.rotation.x += delta;
		ref.current.rotation.y += delta;
	});

	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={() => click(!clicked)}
			onPointerOver={() => hover(true)}
			onPointerOut={() => hover(false)}
		>
			<boxGeometry args={[2, 2, 2]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}
