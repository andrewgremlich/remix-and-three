import { H1, Flex } from "summit-kit";

import { Navigation } from "./Navigation";

type LayoutProps = {
	slideTitle: string;
	children: React.ReactNode;
	currentSlide: number;
};

export const Layout = ({ slideTitle, children, currentSlide }: LayoutProps) => {
	return (
		<div className="min-h-screen">
			<Navigation currentSlide={currentSlide} />

			<Flex
				direction="column"
				align="center"
				justify="center"
				style={{ paddingTop: "30px" }}
			>
				<H1>{slideTitle}</H1>
				{children}
			</Flex>
		</div>
	);
};