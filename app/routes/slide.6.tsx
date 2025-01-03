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
				<Item>
					OffscreenCanvas is dope!
					<Ul>
						<Item>
							Here is an{" "}
							<Link
								href="https://github.com/andrewgremlich/socket-print/blob/main/src/utils/sliceWorker.ts"
								target="_blank"
							>
								example
							</Link>
						</Item>
					</Ul>
				</Item>
				<Item>
					Different labels for the vertical axis.
					<Ul>
						<Item>
							For 3D animation, the vertical axis is typically labeled Y
						</Item>
						<Item>
							For 3D printing, the vertical axis is typically labelled Z
						</Item>
					</Ul>
				</Item>
				<Item>
					If doing freelancing, stick with something that you&apos;ll be
					efficient in.
				</Item>
			</Ul>
		</Layout>
	);
}
