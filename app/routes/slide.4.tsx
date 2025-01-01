import { useLoaderData } from "@remix-run/react";
import { Figure, H2, Link, P, Section } from "summit-kit";

import { Layout } from "@/Layout";
import { TermItem } from "@/Body";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle={"ThreeJS Structure"} currentSlide={number}>
			<Section>
				<Figure
					src="/threejs-structure.svg"
					alt="A diagram demonstrating the structure of ThreeJS"
					width="100%"
				/>
			</Section>
			<Section>
				<H2>Other Terms</H2>
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

				<P>
					I used the fundamentals course on ThreeJS website,{" "}
					<Link
						href="https://threejs.org/manual/#en/fundamentals"
						target="_blank"
					>
						which may be found here.
					</Link>
				</P>
			</Section>
		</Layout>
	);
}
