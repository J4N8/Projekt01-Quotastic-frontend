import React, {FC} from "react";

import Layout from "../components/ui/Layout";
import LoginForm from "../components/user/LoginForm";

const Login: FC = () => {
	return (
		<Layout>
			<div className="text-center">
				<div className="d-inline-flex">
					<h1>Welcome</h1>
					<h1 className="p-1"></h1>
					<h1 className="orange">back!</h1>
				</div>
				<p>Thank you for coming back. Hope you have a good day and inspire others.</p>
			</div>
			<LoginForm />
		</Layout>
	);
};

export default Login;
