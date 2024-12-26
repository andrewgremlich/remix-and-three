import { Link } from "@remix-run/react";
import { Icon } from "summit-kit";

export function Navigation() {
	return (
		<nav className="absolute top-0 bg-gray-800 text-white p-4 w-full flex justify-between">
      <Link to="/three">
        <Icon name="FiArrowLeft" size={24}  />
      </Link>
      <Link to="/three">
        <Icon name="FiArrowRight" size={24}  />
      </Link>
		</nav>
	);
}
