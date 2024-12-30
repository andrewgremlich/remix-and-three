import type { MetaFunction } from "@remix-run/node";
import { Canvas } from "@react-three/fiber";

import { Layout } from "@/Layout";
import { Box } from "@/Box";

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
		<Layout slideTitle="React and Three" currentSlide={-1}>
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
				<Box position={[0, 0, 0]} rotate />
				<Box position={[-5, 0, 0]} rotate />
				<Box position={[5, 0, 0]} rotate />
			</Canvas>
		</Layout>
	);
}
