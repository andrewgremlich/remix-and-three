import { useLoaderData } from "@remix-run/react";
import { Image } from "summit-kit";

import { Layout } from "@/Layout";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout currentSlide={number}>
			<Image src="/edison_quote.jpg" alt="Try hard" width="100%" />
		</Layout>
	);
}
