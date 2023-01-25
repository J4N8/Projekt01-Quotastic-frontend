import {apiRequest} from "./Api";
import {apiRoutes} from "../constants/apiConstants";

export const signout = async () => apiRequest<undefined, void>("post", apiRoutes.SIGNOUT);
