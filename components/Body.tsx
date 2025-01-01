import type { ReactNode } from "react";
import { Li } from "summit-kit";

export const TermItem = ({
	term,
	definition,
}: { term: string; definition?: string }) => {
	return (
		<dl className="mr-10">
			<dt className="text-3xl mb-5">{term}</dt>
			<dd className="text-xl mb-10">{definition}</dd>
		</dl>
	);
};

export const Item = ({ children }: { children: ReactNode }) => {
	return <Li classes={["text-3xl", "mb-10"]}>{children}</Li>;
};
