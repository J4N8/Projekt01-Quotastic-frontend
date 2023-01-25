import React, {FC} from "react";

import Layout from "../components/ui/Layout";
import LoginForm from "../components/user/LoginForm";

const Login: FC = () => {
	return (
		<Layout>
			<LoginForm />
		</Layout>
	);
};

export default Login;
