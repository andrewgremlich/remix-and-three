import { useLoaderData } from "@remix-run/react";

import { Layout } from "@/Layout";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle="Use Loader Data" currentSlide={number}>
			<h2>hello</h2>
		</Layout>
	);
}
