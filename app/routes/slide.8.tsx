import { useLoaderData } from "@remix-run/react";
import { Link, Ul } from "summit-kit";

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
			<Ul>
				<Item>
					Three.JS doesn&apos;t save the shape
					<Ul>
						<Item>You would have to save the matrix to save the shape.</Item>
					</Ul>
				</Item>
				<Item>
					I should have kept up with math.
					<Ul>
						<Item>
							Raytracing is very computationally heavy!{" "}
							<Link
								href="https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/moller-trumbore-ray-triangle-intersection.html"
								target="_blank"
							>
								Raytracing example
							</Link>
						</Item>
					</Ul>
				</Item>
				<Item>OffscreenCanvas is dope!</Item>
				<Item>Different labels for the vertical axis.</Item>
			</Ul>
		</Layout>
	);
}
