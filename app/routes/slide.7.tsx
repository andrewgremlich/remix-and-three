import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { Layout } from "@/Layout";
import { slideLoader } from "utils/slideLoader";
import type { SlideLoaderData } from "utils/types";

export const loader = (args: LoaderFunctionArgs) => {
	return slideLoader(args);
};

export default function Index() {
	const { number } = useLoaderData<SlideLoaderData>();

	return (
		<Layout slideTitle="Modify Mesh with Form" currentSlide={number}>
			<h2>hello</h2>
			<Form>
				<label>
					<span>Scale</span>
					<input type="number" name="scale" />
				</label>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Submit
				</button>
			</Form>
		</Layout>
	);
}
