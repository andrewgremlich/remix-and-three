import { Link } from "@remix-run/react";
import { Icon, Flex } from "summit-kit";

type NavigationProps = {
	currentSlide: number;
};

export function Navigation(props: NavigationProps) {
	return (
		<nav className="relative top-0 bg-gray-800 text-white p-4 w-full">
			<Flex justify="space-between">
				<Link
					to={
						props.currentSlide === -1
							? "/slide/1"
							: `/slide/${props.currentSlide - 1}`
					}
				>
					<Icon name="FiArrowLeft" size={24} />
				</Link>
				<Link
					to={
						props.currentSlide === -1
							? "/slide/1"
							: `/slide/${props.currentSlide + 1}`
					}
				>
					<Icon name="FiArrowRight" size={24} />
				</Link>
			</Flex>
		</nav>
	);
}
