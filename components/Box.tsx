import type * as THREE from "three";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useRef, useState } from "react";

export type BoxProps = ThreeElements["mesh"] & {
	wireframe?: boolean;
	rotate?: boolean;
};

export function Box(props: BoxProps) {
	// biome-ignore lint/style/noNonNullAssertion:
	const ref = useRef<THREE.Mesh>(null!);
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);

	useFrame((state, delta) => {
		if (!ref.current) return;

		if (props.rotate) {
			ref.current.rotation.x += delta;
			ref.current.rotation.y += delta;
		}
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
			<meshStandardMaterial
				color={hovered ? "hotpink" : "orange"}
				wireframe={props.wireframe ?? false}
			/>
		</mesh>
	);
}
