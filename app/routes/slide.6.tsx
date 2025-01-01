import { useEffect } from "react";
import { useLoaderData } from "@remix-run/react";
import fs from "node:fs/promises";
import path from "node:path";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/Addons.js";

import { Layout } from "@/Layout";
import { Box } from "@/Box";
import { Lighting } from "@/Lighting";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = async (args: LoaderFunctionArgs) => {
	// try {
	const pathToSTL = path.resolve(process.cwd(), "public/3d-data.json");
	// const exists = await fs.stat(pathToSTL);

	return { ...slideLoader(args) };
	// } catch (error) {
	// 	console.error(error);
	// 	return { ...slideLoader(args) };
	// }
};

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	useEffect(() => {
		const fetchSTL = async () => {
			const pathToSTL = await fetch("/Master_Chief.stl");
			const buffer = await pathToSTL.arrayBuffer();
			const loader = new STLLoader();
			const geometry = loader.parse(buffer);

			console.log(geometry);
		};

		fetchSTL();
	}, []);

	return (
		<Layout slideTitle="Loading Data" currentSlide={number}>
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
		</Layout>
	);
}
