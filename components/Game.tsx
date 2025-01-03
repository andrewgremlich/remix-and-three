import { v4 } from "uuid";
import { useFrame } from "@react-three/fiber";

import { PlayerBox } from "./PlayerBox";
import { useFirebaseConnection, useReadFirebaseData } from "~/utils/firebase";
import type { Player } from "~/utils/types";

export type GameProps = {
	sessionId: string;
};

export const Game = ({ sessionId }: GameProps) => {
	const { database } = useFirebaseConnection();
	const players = useReadFirebaseData<Player[]>(
		database,
		`sessions/${sessionId}/players`,
	);

	// Use the physics loop to check for collisions or apply forces
	useFrame(() => {});

	return (
		<>
			{players &&
				Object.values(players)?.map((player) => (
					<PlayerBox
						key={v4()}
						position={player.position}
						color={player.color}
					/>
				))}
		</>
	);
};
