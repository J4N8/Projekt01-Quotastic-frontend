import React, {FC} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {routes} from "../../constants/routesConstants";

const Navbar: FC = () => {
	useNavigate();
	return (
		<>
			<header>
				<nav className="navbar navbar-expand-lg bg-light">
					<div className="container-xxl p-4 pb-0">
						<Link className="navbar-brand" to={routes.HOME}>
							<img src="/images/logo.png" alt="SkillUp Mentor" width={123} />
						</Link>
						<div
							className="collapse navbar-collapse justify-content-end align-items-center"
							id="navbarTogglerDemo02"
						>
							<ul className="navbar-nav mb-2 mb-lg-0">
								<li className="nav-item pe-4">
									<NavLink className="nav-link component-orange rounded-4" to={routes.LOGIN}>
										Login
									</NavLink>
								</li>
								<li className="nav-item">
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
