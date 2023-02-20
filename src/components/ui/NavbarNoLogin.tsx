import React, {FC, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {routes} from "../../constants/routesConstants";
import useMediaQuery from "../../hooks/useMediaQuery";

const Navbar: FC = () => {
	const {isMobile} = useMediaQuery(768);
	const [navbarToggle, setNavbarToggle] = useState(false);
	useNavigate();
	return (
		<>
			<header>
				<nav className="navbar navbar-expand-lg bg-light">
					<div className="container-xxl p-4 pb-0">
						<Link className="navbar-brand" to={routes.HOME}>
							<img src="/images/logo.png" alt="SkillUp Mentor" width={123} />
						</Link>
						<button className="navbar-toggler" type="button" onClick={() => setNavbarToggle(!navbarToggle)}>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className={
								navbarToggle
									? "navbar-collapse justify-content-end align-items-center"
									: "collapse navbar-collapse justify-content-end align-items-center"
							}
							id="navbarTogglerDemo02"
						>
							<ul
								className={isMobile ? "navbar-nav mb-2 mb-lg-0 text-center" : "navbar-nav mb-2 mb-lg-0"}
							>
								<li className={isMobile ? "nav-item pe-4" : "nav-item pe-4"}>
									<NavLink className="nav-link component-orange rounded-4" to={routes.LOGIN}>
										Login
									</NavLink>
								</li>
								<li className={isMobile ? "nav-item pe-4" : "nav-item pe-4"}>
									<NavLink className="nav-link component-orange rounded-4" to={routes.SIGNUP}>
										Signup
									</NavLink>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
