import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Icon } from "summit-kit";

import type { GameLoaderData, Player } from "~/utils/types";
import { base64UrlDecode } from "~/utils/base64";
import {
	pushData,
	setData,
	useFirebaseConnection,
	useReadFirebaseData,
} from "~/utils/firebase";

export const loader = async (args: LoaderFunctionArgs) => {
	const url = new URL(args.request.url);
	return { url: url.href, sessionId: url.searchParams.get("sessionId") };
};

export default function Index() {
	const { database } = useFirebaseConnection();
	const loaderData = useLoaderData<GameLoaderData>();
	const [playerId, setPlayerId] = useState<string | null>(null);
	const [connected, setConnected] = useState(false);
	const [sessionId, setSessionId] = useState<string | null>(null);
	const player = useReadFirebaseData<Player>(
		database,
		`sessions/${sessionId}/players/${playerId}`,
	);

	useEffect(() => {
		if (loaderData.sessionId) {
			const data = JSON.parse(
				base64UrlDecode(loaderData.sessionId),
			) as unknown as { sessionId: string };

			setSessionId(data.sessionId);

			const initData = { position: [0, 0, 0], color: "darkblue" };

			const newPlayer = pushData(
				database,
				`sessions/${data.sessionId}/players`,
				initData,
			);

			if (newPlayer?.key) setPlayerId(newPlayer.key);

			setConnected(true);
		}
	}, [loaderData.sessionId, database]);

	const updateMovement = ({ x, z }: { x: number; z: number }) => {
		if (player && playerId && sessionId) {
			const updatedMovement = {
				position: [
					player.position[0] + x,
					player.position[1],
					player.position[2] + z,
				],
			};

			setData(database, `sessions/${sessionId}/players/${playerId}`, {
				...player,
				position: updatedMovement.position,
			});
		}
	};

	return (
		<div className="bg-sky-800 grid grid-cols-3 grid-rows-3 gap-10 place-items-center place-content-center h-full">
			{connected ? (
				<Icon
					classes={["col-start-2", "row-start-2"]}
					name="FiUserCheck"
					size={100}
				/>
			) : (
				<Icon
					classes={["col-start-2", "row-start-2"]}
					name="FiUserX"
					size={100}
				/>
			)}
			<div
				className="col-start-3 row-start-2"
				onPointerDown={() => {
					navigator.vibrate(500);
					console.log("Right");
					updateMovement({ x: 1, z: 0 });
				}}
			>
				<Icon name="FiArrowRight" size={100} />
			</div>
			<div
				className="col-start-1 row-start-2"
				onPointerDown={() => {
					navigator.vibrate(500);
					console.log("Left");
					updateMovement({ x: -1, z: 0 });
				}}
			>
				<Icon name="FiArrowLeft" size={100} />
			</div>
			<div
				className="col-start-2 row-start-1"
				onPointerDown={() => {
					navigator.vibrate(500);
					console.log("Up");
					updateMovement({ x: 0, z: -1 });
				}}
			>
				<Icon name="FiArrowUp" size={100} />
			</div>
			<div
				className="col-start-2 row-start-3"
				onPointerDown={() => {
					navigator.vibrate(500);
					console.log("Down");
					updateMovement({ x: 0, z: 1 });
				}}
			>
				<Icon name="FiArrowDown" size={100} />
			</div>
		</div>
	);
}
