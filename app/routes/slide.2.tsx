import { useLoaderData } from "@remix-run/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Layout } from "@/Layout";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";
import { Lighting } from "@/Lighting";
import { TermItem } from "@/Body";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle={"Scene & Renderer"} currentSlide={number}>
			<Canvas
				className="mb-20"
				style={{ height: "400px", width: "80vw" }}
				camera={{ position: [5, 5, 5], fov: 50 }}
			>
				<OrbitControls />
				<Lighting />
				<gridHelper args={[10, 10, "white", "gray"]} />
			</Canvas>

			<ul>
				<TermItem
					term="Scene"
					definition="The world where all 3D objects live."
				/>
				<TermItem
					term="Renderer"
					definition="The camera that takes a snapshot of the scene."
				/>
			</ul>
		</Layout>
	);
}
