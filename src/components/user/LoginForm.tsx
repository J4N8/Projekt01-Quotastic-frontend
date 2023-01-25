import React, {FC, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LoginUserFields, useLoginForm} from "../../hooks/react-hook-form/useLogin";
import {Button, Form, FormLabel, Toast, ToastContainer} from "react-bootstrap";
import {Controller} from "react-hook-form";
import {routes} from "../../constants/routesConstants";
import * as API from "api/Api";
import {StatusCode} from "../../constants/errorConstants";
import authStore from "../../stores/auth.store";
import {observer} from "mobx-react";

const LoginForm: FC = () => {
	const navigate = useNavigate();
	const {handleSubmit, errors, control} = useLoginForm();
	const [apiError, setApiError] = useState("");
	const [showError, setShowError] = useState(false);

	const onSubmit = handleSubmit(async (data: LoginUserFields) => {
		const response = await API.login(data);
		if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
			setApiError(response.data.message);
			setShowError(true);
		} else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
			setApiError(response.data.message);
			setShowError(true);
		} else {
			authStore.login(response.data);
			navigate(routes.HOME);
		}
	});

	return (
		<>
			<Form className="login-form" onSubmit={onSubmit}>
				<Controller
					control={control}
					name="email"
					render={({field}) => (
						<Form.Group className="mb-3">
							<FormLabel htmlFor="email">Email</FormLabel>
							<input
								{...field}
								type="email"
								placeholder="example@example.com"
								aria-label="Email"
								aria-describedby="email"
								className={errors.email ? "form-control is-invalid" : "form-control"}
							/>
							{errors.email && <div className="invalid-feedback text-danger">{errors.email.message}</div>}
						</Form.Group>
					)}
				/>
				<Controller
					control={control}
					name="password"
					render={({field}) => (
						<Form.Group className="mb-3">
							<FormLabel htmlFor="password">Email</FormLabel>
							<input
								{...field}
								type="password"
								placeholder="******"
								aria-label="Password"
								aria-describedby="password"
								className={errors.password ? "form-control is-invalid" : "form-control"}
							/>
							{errors.password && (
								<div className="invalid-feedback text-danger">{errors.password.message}</div>
							)}
						</Form.Group>
					)}
				/>
				<div className="d-flex justify-content-between align-items-center mb-2">
					<p className="mb-0">Don't have an account yet?</p>
					<Link className="text-decoration-none text-end" to={routes.SIGNUP}>
						Create account
					</Link>
				</div>
				<Button className="w-100" type="submit">
					Login
				</Button>
			</Form>

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

export default observer(LoginForm);
