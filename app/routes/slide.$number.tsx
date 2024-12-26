import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { H1 } from "summit-kit";

import { Layout } from "@/Layout";

type LoaderData = {
	number: number;
};

export const loader = ({ params }: LoaderFunctionArgs) => {
	const number = Number(params.number);

	if (number < 1) {
		return redirect("/");
	}

	return {
		number: Number(params.number),
	};
};

export default function Index() {
	const { number } = useLoaderData<LoaderData>();

	return (
		<Layout slideTitle={`Slide ${number}`} currentSlide={number}>
			<H1>Hello Wolrd</H1>
		</Layout>
	);
}
