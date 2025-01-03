import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { QRCodeSVG } from "qrcode.react";
// import { v4 } from "uuid";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";

import { Layout } from "@/Layout";
import { Lighting } from "@/Lighting";
// import { PlayerBox } from "@/PlayerBox";
import { Ground } from "@/Ground";
import type { Player } from "~/utils/types";
import {
	pushData,
	useFirebaseConnection,
	useReadFirebaseData,
} from "~/utils/firebase";
import { base64UrlEncode } from "~/utils/base64";
import { Game } from "@/Game";

export const loader = async (args: LoaderFunctionArgs) => {
	const url = new URL(args.request.url);

	return { url: url.origin };
};

export default function Index() {
	const { database } = useFirebaseConnection();
	const [sessionId, setSessionId] = useState<string | null>(null);
	const players = useReadFirebaseData<Player[]>(
		database,
		`sessions/${sessionId}/players`,
	);
	const [sessionUrl, setSessionUrl] = useState<string | null>(null);

	useEffect(() => {
		if (database) {
			const sessionData = pushData(database, "sessions", { hello: "world" });

			if (sessionData?.key) setSessionId(sessionData?.key);
		}
	}, [database]);

	useEffect(() => {
		if (!sessionUrl && database && sessionId) {
			setSessionUrl(
				`${window.location.origin}/controller?sessionId=${base64UrlEncode(JSON.stringify({ sessionId }))}`,
			);
		}
	}, [sessionUrl, database, sessionId]);

	console.log(sessionUrl);

	return (
		<Layout slideTitle="Boxing">
			<Canvas
				style={{ height: "600px", width: "100%" }}
				camera={{ position: [0, 30, 30], fov: 50 }}
			>
				<OrbitControls />
				<Physics>
					<Lighting />
					<Game />
					<RigidBody type="fixed">
						<mesh position={[0, -1, 0]}>
							<boxGeometry args={[50, 1, 50]} />
							<meshStandardMaterial color="darkgreen" />
						</mesh>
					</RigidBody>

					{/* {players &&
						Object.values(players)?.map((player) => (
							<PlayerBox
								key={v4()}
								position={player.position}
								color={player.color}
							/>
						))} */}
				</Physics>
			</Canvas>
			<div className="fixed bottom-5 left-5">
				{sessionUrl && <QRCodeSVG value={sessionUrl} size={200} />}
			</div>
		</Layout>
	);
}
