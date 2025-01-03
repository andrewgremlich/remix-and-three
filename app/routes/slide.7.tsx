import { useLoaderData } from "@remix-run/react";
import { P } from "summit-kit";

import { Layout } from "@/Layout";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle="Rapier" currentSlide={number}>
			<P classes={["text-4xl"]}>Check it out in VSCode!</P>
		</Layout>
	);
}
