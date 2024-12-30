import { useLoaderData } from "@remix-run/react";
import { Canvas } from "@react-three/fiber";

import { Layout } from "@/Layout";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle={"Scene & Renderer"} currentSlide={number}>
			<Canvas
				style={{ height: "400px", width: "80vw" }}
				camera={{ position: [5, 5, 5], fov: 50 }}
			>
				<gridHelper args={[10, 10, "white", "gray"]} />
				<ambientLight intensity={Math.PI / 2} />
				<spotLight
					position={[10, 10, 10]}
					angle={0.15}
					penumbra={1}
					decay={0}
					intensity={Math.PI}
				/>
				<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
			</Canvas>
		</Layout>
	);
}
