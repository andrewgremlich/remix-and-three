import type { MetaFunction } from "@remix-run/node";
import { H1 } from "summit-kit";
import { Canvas } from "@react-three/fiber";

import { Box } from "@/Box";
import { Navigation } from "@/Navigation";

export const meta: MetaFunction = () => {
	return [
		{ title: "React and Three" },
		{
			name: "description",
			content: "This is a presentation on using ThreeJS in Remix!",
		},
	];
};

export default function Index() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<H1>React and Three JS</H1>

			<Navigation />

			<Canvas style={{ height: "400px", width: "80vw" }}>
				<ambientLight intensity={Math.PI / 2} />
				<spotLight
					position={[10, 10, 10]}
					angle={0.15}
					penumbra={1}
					decay={0}
					intensity={Math.PI}
				/>
				<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
				<Box position={[-1.2, 0, 0]} />
			</Canvas>
		</div>
	);
}
