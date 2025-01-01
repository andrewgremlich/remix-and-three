import { useLoaderData } from "@remix-run/react";
import { Li, Link } from "summit-kit";

import { Layout } from "@/Layout";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";
import { Item } from "@/Body";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout
			slideTitle="Lessons Learned from Freelance project"
			currentSlide={number}
		>
			<ul>
				<Item>
					Three.JS doesn&apos;t save the shape
					<ul>
						<Li>You would have to save the matric to save the shape.</Li>
					</ul>
				</Item>
				<Item>
					I shouldn&apos;t have kept up with math.
					<ul>
						<Li>
							<Link href="https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/moller-trumbore-ray-triangle-intersection.html">
								Raytracing example
							</Link>
						</Li>
					</ul>
				</Item>
        <Item>
          OffscreenCanvas is dope!
        </Item>
			</ul>
		</Layout>
	);
}
