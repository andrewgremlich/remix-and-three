import { useLoaderData } from "@remix-run/react";

import { Layout } from "@/Layout";
import { TermItem } from "@/Body";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle={"Terminology"} currentSlide={number}>
			<ul className="flex flex-wrap justify-center">
				<TermItem term="Scene" />
				<TermItem term="Renderer" />
				<TermItem term="Geometry" />
				<TermItem term="Mesh" />
				<TermItem term="Camera" />
				<TermItem term="Material" />
				<TermItem term="Light" />
				<TermItem term="Normals" />
				<TermItem term="UV" />
			</ul>
		</Layout>
	);
}
