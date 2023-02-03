import React, {FC} from "react";
import Layout from "../components/ui/Layout";
import RegisterForm from "../components/user/RegisterForm";

const Register: FC = () => {
	return (
		<Layout>
			<div className="text-center">
				<h1>What is your name?</h1>
				<p>Your name will appear on quotes and your public profile.</p>
			</div>
			<RegisterForm />
		</Layout>
	);
};

export default Register;
