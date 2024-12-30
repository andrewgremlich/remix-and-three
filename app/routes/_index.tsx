import type { MetaFunction } from "@remix-run/node";
import { Canvas } from "@react-three/fiber";

import { Layout } from "@/Layout";
import { Box } from "@/Box";
import { Lighting } from "@/Lighting";

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
				<Lighting />
				<Box position={[0, 0, 0]} rotate />
				<Box position={[-5, 0, 0]} rotate />
				<Box position={[5, 0, 0]} rotate />
			</Canvas>
		</Layout>
	);
}
