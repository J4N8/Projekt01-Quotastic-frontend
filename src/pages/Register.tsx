import React, {FC} from "react";
import Layout from "../components/ui/Layout";
import RegisterForm from "../components/user/RegisterForm";

const Register: FC = () => {
	return (
		<Layout>
			<div className="text-center">
				<div className="d-inline-flex">
					<h1>What is your</h1>
					<h1 className="p-1"></h1>
					<h1 className="orange">name?</h1>
				</div>
				<p>Your name will appear on quotes and your public profile.</p>
			</div>
			<RegisterForm />
		</Layout>
	);
};

export default Register;
