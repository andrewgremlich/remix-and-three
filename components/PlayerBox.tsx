import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import type { Mesh } from "three";

type PlayerBoxProps = {
	position: [number, number, number];
	color: string;
};

export const PlayerBox = (props: PlayerBoxProps) => {
	const ref = useRef<Mesh>(null);

	return (
		<RigidBody colliders="cuboid">
			<mesh ref={ref} position={props.position}>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color={props.color} />
			</mesh>
		</RigidBody>
	);
};
