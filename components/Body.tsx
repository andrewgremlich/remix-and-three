import { Li } from "summit-kit";

export const TermItem = ({
	term,
	definition,
}: { term: string; definition?: string }) => {
	return (
		<Li classes={["text-5xl", "mb-10", "mx-10"]}>
			{term}
			{definition ? `: ${definition}` : null}
		</Li>
	);
};
