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
			<Image
				src="https://fourminutebooks.com/wp-content/uploads/2023/02/marcus-aurelius-quotes-27.jpg"
				alt="Try hard by Marcus Aurelius"
				width="100%"
			/>
		</Layout>
	);
}
