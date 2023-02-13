import {FC, ReactNode} from "react";
import Navbar from "./Navbar";
import {userStorage} from "../../utils/localStorage";
import HomeNotAuthenticated from "../homepage/HomeNotAuthenticated";
import HomeAuthenticated from "../homepage/HomeAuthenticated";
import NavbarNoLogin from "./NavbarNoLogin";

interface Props {
	children: ReactNode | ReactNode[];
}

const Layout: FC<Props> = ({children}) => {
	return (
		<>
			{userStorage.getUser() === null ? <NavbarNoLogin /> : <Navbar />}
			<div className="layout-container container-xxl p-4">{children}</div>
			{/*<Footer />*/}
		</>
	);
};

export default Layout;
