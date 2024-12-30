import { useLoaderData } from "@remix-run/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Layout } from "@/Layout";
import { Box } from "@/Box";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";
import { Lighting } from "@/Lighting";
import { TermItem } from "@/Body";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle={"Geometry, Mesh, & Material"} currentSlide={number}>
			<Canvas
				className="mb-20"
				style={{ height: "400px", width: "80vw" }}
				camera={{ position: [5, 5, 5], fov: 50 }}
			>
				<OrbitControls />
				<gridHelper args={[10, 10, "white", "gray"]} />
				<Lighting />
				<Box position={[2.5, 0, 0]} wireframe />
				<Box position={[-2.5, 0, 0]} />
			</Canvas>

			<ul>
				<TermItem
					term="Geometry"
					definition="The shape of a 3D object, like a cube or sphere."
				/>
				<TermItem
					term="Material"
					definition="The texture or color of a 3D object."
				/>
				<TermItem
					term="Mesh"
					definition="The combination of geometry and material."
				/>
			</ul>
		</Layout>
	);
}
