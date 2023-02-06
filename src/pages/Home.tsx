import Layout from "components/ui/Layout";
import {FC} from "react";
import {routes} from "../constants/routesConstants";
import {NavLink} from "react-router-dom";
import {userStorage} from "../utils/localStorage";
import HomeNotAuthenticated from "../components/homepage/HomeNotAuthenticated";
import HomeAuthenticated from "../components/homepage/HomeAuthenticated";

const Home: FC = () => {
	return <Layout>{userStorage.getUser() === null ? <HomeNotAuthenticated /> : <HomeAuthenticated />}</Layout>;
};

export default Home;
