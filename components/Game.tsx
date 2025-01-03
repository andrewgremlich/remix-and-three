import { useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

import { PlayerBox } from "./PlayerBox";

export const Game = () => {
	const { world } = useRapier();

	// Use the physics loop to check for collisions or apply forces
	useFrame(() => {
		world.forEachActiveRigidBody((body) => {
			const velocity = body.linvel(); // Get linear velocity
			if (velocity.length() > 5) {
				body.setLinvel(velocity.scale(0.9)); // Apply friction
			}
		});
	});

	// Spawn multiple boxes in a stack
	const boxes = [];
	for (let i = 0; i < 10; i++) {
		boxes.push(
			<PlayerBox
				key={i}
				position={[Math.random() * 5, i * 2, Math.random() * 5]}
				color="red"
			/>,
		);
	}

	return <>{boxes}</>;
};
