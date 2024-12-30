import { Li } from "summit-kit";

export const TermItem = ({ term }: { term: string }) => {
	return <Li classes={["text-5xl", "mb-10", "mx-10"]}>{term}</Li>;
};
