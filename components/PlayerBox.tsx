import type { Mesh } from "three";
import { useEffect } from "react";
import { useBox } from "@react-three/cannon";

type PlayerBoxProps = {
	position: [number, number, number];
	color: string;
};

export const PlayerBox = (props: PlayerBoxProps) => {
	const [ref] = useBox<Mesh>(() => ({
		mass: 1,
		position: props.position,
	}));

	useEffect(() => {
		if (ref.current) {
			const [x, y, z] = props.position;
			ref.current.position.set(x, y, z); // Pass all three dimensions
		}
	}, [props.position, ref]);

	return (
		<mesh ref={ref} castShadow>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={props.color} />
		</mesh>
	);
};
