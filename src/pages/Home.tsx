import Layout from "components/ui/Layout";
import {FC} from "react";
import {routes} from "../constants/routesConstants";
import {NavLink} from "react-router-dom";

const Home: FC = () => {
	return (
		<Layout>
			<div className="p-2 mb-4">
				<div className="container-fluid py-4">
					<h1>Welcome to Quotastic</h1>
					<p>
						Quotastic is free online platform for you to explore the quips, quotes and proverbs. Sign up and
						express yourself.
					</p>
					<NavLink className="nav-link pe-0" to={routes.SIGNUP}>
						Signup
					</NavLink>
				</div>
				<div>
					<img src="landing_page_quotes.png" />
				</div>

				<div>
					<h1>Explore the world of fantastic quotes</h1>
					<br />
					<h3>Most upvoted quotes</h3>
					<p>
						Most upvoted quotes on the platform. Sign up or login to like the quotes and keep them saved in
						your profile
					</p>
					{/*	TODO: QUOTES SORTED BY VOTE SCORE*/}
					<NavLink className="nav-link pe-0" to={routes.SIGNUP}>
						Sign up to see more
					</NavLink>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
