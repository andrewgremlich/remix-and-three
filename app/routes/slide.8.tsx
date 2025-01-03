import { useLoaderData } from "@remix-run/react";
import { Link, P, Ul } from "summit-kit";

import { Layout } from "@/Layout";
import { Item } from "@/Body";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = slideLoader;

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle="Firebase Integration" currentSlide={number}>
			<P>sorry not partykit...</P>
			<Ul>
				<Item>
					Firebase integration with{" "}
					<Link
						href="https://github.com/andrewgremlich/remix-and-three/blob/main/app/utils/firebase.ts"
						target="_blank"
					>
						firebase.ts
					</Link>
				</Item>
				<Item>
					Playground implementation with{" "}
					<Link
						href="https://github.com/andrewgremlich/remix-and-three/blob/main/app/routes/play.tsx"
						target="_blank"
					>
						routes/play.tsx
					</Link>
				</Item>
				<Item>
					Controller implementation with{" "}
					<Link
						href="https://github.com/andrewgremlich/remix-and-three/blob/main/app/routes/controller.tsx"
						target="_blank"
					>
						routes/controller.tsx
					</Link>
				</Item>
			</Ul>
		</Layout>
	);
}
