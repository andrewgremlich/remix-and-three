import { Layout } from "@/Layout";
import { Canvas } from "@react-three/fiber";

export default function Index() {
	return (
		<Layout slideTitle="Boxing">
			<Canvas>
				<mesh>
					<boxGeometry args={[1, 1, 1]} />
					<meshStandardMaterial color="hotpink" />
				</mesh>
			</Canvas>
		</Layout>
	);
}
