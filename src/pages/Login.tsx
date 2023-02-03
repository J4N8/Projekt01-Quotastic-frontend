import React, {FC} from "react";

import Layout from "../components/ui/Layout";
import LoginForm from "../components/user/LoginForm";

const Login: FC = () => {
	return (
		<Layout>
			<div className="text-center">
				<h1>Welcome back!</h1>
				<p>Thank you for coming back. Hope you have a good day and inspire others.</p>
			</div>
			<LoginForm />
		</Layout>
	);
};

export default Login;
