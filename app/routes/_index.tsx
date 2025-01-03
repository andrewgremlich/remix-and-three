import type { MetaFunction } from "@remix-run/node";
import { Canvas } from "@react-three/fiber";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

import { Layout } from "@/Layout";
import { Box } from "@/Box";
import { Lighting } from "@/Lighting";

export const meta: MetaFunction = () => {
	return [
		{ title: "React and Three.JS" },
		{
			name: "description",
			content: "This is a presentation on using ThreeJS in Remix!",
		},
	];
};

export default function Index() {
	const [location, setLocation] = useState("");

	useEffect(() => {
		setLocation(window.location.href);
		// some kind of real time connection to a server
	}, []);

	return (
		<Layout slideTitle="React and Three" currentSlide={-1}>
			<Canvas style={{ height: "400px", width: "80vw" }}>
				<Lighting />
				<Box position={[0, 0, 0]} rotate />
				<Box position={[-5, 0, 0]} rotate />
				<Box position={[5, 0, 0]} rotate />
			</Canvas>
			{location ? (
				<div className="fixed bottom-0 left-0 p-4">
					<figure>
						<QRCodeSVG value="https://remix-and-three.gremlich.dev" />
						<figcaption>To the website!</figcaption>
					</figure>
				</div>
			) : null}
		</Layout>
	);
}
