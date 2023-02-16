import React, {FC, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {routes} from "../../constants/routesConstants";
import authStore from "../../stores/auth.store";
import {Button, Toast, ToastContainer} from "react-bootstrap";
import {StatusCode} from "../../constants/errorConstants";
import * as API from "api/Api";
import CreateQuoteForm from "../quote/CreateQuoteForm";
import UpdateQuoteForm from "../quote/UpdateQuoteForm";
import Avatar from "react-avatar";
import useMediaQuery from "../../hooks/useMediaQuery";

const Navbar: FC = () => {
	const navigate = useNavigate();
	const {isMobile} = useMediaQuery(768);
	const [apiError, setApiError] = useState("");
	const [showError, setShowError] = useState(false);
	const [shown, setShown] = useState(false);
	const [quoteEdit] = useState(undefined);

	const signout = async () => {
		const response = await API.signout();
		if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
			setApiError(response.data.message);
			setShowError(true);
		} else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
			setApiError(response.data.message);
			setShowError(true);
		} else {
			authStore.signout();
			navigate(routes.LOGIN);
		}
	};

	return (
		<>
			<header>
				<CreateQuoteForm shown={shown} />
				<UpdateQuoteForm defaultValues={quoteEdit} shown={false} />
				<nav className="navbar navbar-expand-lg bg-orange">
					<div className="container-xxl p-4 pb-0">
						<Link className="navbar-brand" to={routes.HOME}>
							<img src="/images/logo.png" alt="SkillUp Mentor" width={123} />
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarTogglerDemo02"
							aria-controls="navbarTogglerDemo02"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse justify-content-end align-items-center"
							id="navbarTogglerDemo02"
						>
							<ul className="navbar-nav mb-2 mb-lg-0">
								<li className="nav-item pe-4">
									<NavLink className="nav-link" to={routes.HOME}>
										Home
									</NavLink>
								</li>
								<li className="nav-item pe-4">
									<NavLink className="nav-link" to={routes.QUOTES}>
										Quotes
									</NavLink>
								</li>
								{authStore.user ? (
									<li className="nav-item pe-4">
										<Button className="component-orange-reverse" onClick={signout}>
											Signout
										</Button>
									</li>
								) : (
									<>
										<li className="nav-item pe-4">
											<NavLink className="nav-link" to={routes.LOGIN}>
												Login
											</NavLink>
										</li>
										<li className="nav-item pe-4">
											<NavLink className="nav-link pe-0" to={routes.SIGNUP}>
												Signup
											</NavLink>
										</li>
									</>
								)}

								{isMobile ? (
									<Link
										className="btn text-decoration-none text-light me-3"
										to={`${routes.HOME}/users/edit`}
										state={{
											id: authStore.user?.id,
											first_name: authStore.user?.first_name,
											last_name: authStore.user?.last_name,
											email: authStore.user?.email,
											avatar: authStore.user?.avatar,
											isActiveUser: true,
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-person-circle"
											viewBox="0 0 16 16"
										>
											<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
											<path
												fillRule="evenodd"
												d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
											/>
										</svg>
									</Link>
								) : (
									<Link
										className="btn text-decoration-none text-light pe-4"
										to={`${routes.HOME}/users/edit`}
										state={{
											id: authStore.user?.id,
											first_name: authStore.user?.first_name,
											last_name: authStore.user?.last_name,
											email: authStore.user?.email,
											avatar: authStore.user?.avatar,
											isActiveUser: true,
										}}
									>
										<Avatar
											className="topbar__avatar"
											round
											src={`${process.env.REACT_APP_API_URL}/files/${authStore.user?.avatar}`}
											alt={
												authStore.user?.first_name || authStore.user?.last_name
													? `${authStore.user?.first_name} ${authStore.user?.last_name}`
													: authStore.user?.email
											}
										/>
									</Link>
								)}

								<li className="nav-item pe-4">
									<Button
										className="btn component-orange-reverse rounded-circle bi bi-plus-lg"
										onClick={() => setShown(true)}
									></Button>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
			{showError && (
				<ToastContainer className="p-3" position="top-end">
					<Toast onClose={() => setShowError(false)} show={showError}>
						<Toast.Header>
							<strong className="me-suto text-danger">Error</strong>
						</Toast.Header>
						<Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
					</Toast>
				</ToastContainer>
			)}
		</>
	);
};

export default Navbar;
