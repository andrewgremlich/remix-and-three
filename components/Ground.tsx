import type { Mesh } from "three";
import { usePlane } from "@react-three/cannon";

export const Ground = () => {
	const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotate to be flat (permanent)
	}));

	return (
		<mesh ref={ref}>
			<planeGeometry args={[50, 50]} />
			<meshStandardMaterial color="darkgreen" />
		</mesh>
	);
};
