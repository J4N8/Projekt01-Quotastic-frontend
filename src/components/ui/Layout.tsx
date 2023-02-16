import {FC, ReactNode} from "react";
import Navbar from "./Navbar";
import {userStorage} from "../../utils/localStorage";
import NavbarNoLogin from "./NavbarNoLogin";
import Footer from "./Footer";

interface Props {
	children: ReactNode | ReactNode[];
}

const Layout: FC<Props> = ({children}) => {
	return (
		<div className="layout">
			{userStorage.getUser() === null ? <NavbarNoLogin /> : <Navbar />}
			<div className="layout-container container-xxl p-4">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
