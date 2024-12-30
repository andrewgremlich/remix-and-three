import { H1, Flex } from "summit-kit";

import { Navigation } from "./Navigation";

type LayoutProps = {
	slideTitle: string;
	children: React.ReactNode;
	currentSlide?: number;
};

export const Layout = ({ slideTitle, children, currentSlide }: LayoutProps) => {
	return (
		<div className="min-h-screen">
			<Navigation currentSlide={currentSlide ?? -1} />
			<Flex
				direction="column"
				align="center"
				justify="center"
				style={{ paddingTop: "30px" }}
			>
				<H1 classes={["text-7xl"]}>{slideTitle}</H1>
				<div className="px-28 w-full h-full flex flex-col">{children}</div>
			</Flex>
		</div>
	);
};
