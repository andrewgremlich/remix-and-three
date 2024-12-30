import { useLoaderData } from "@remix-run/react";

import { Layout } from "@/Layout";
import { TermItem } from "@/Body";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle={"Final Terminology"} currentSlide={number}>
			<ul>
				<TermItem
					term="Normals"
					definition="How other 3D elements interact with a material and mesh"
				/>
				<TermItem
					term="UV"
					definition="Unsigned Vertex: Putting 2D textures to a location in a 3D realm."
				/>
			</ul>
		</Layout>
	);
}
