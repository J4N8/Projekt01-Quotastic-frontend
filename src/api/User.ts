import {apiRequest} from "./Api";
import {apiRoutes} from "../constants/apiConstants";
import {UserType} from "../models/auth";
import {RegisterUserFields} from "../hooks/react-hook-form/useRegister";
import {LoginUserFields} from "../hooks/react-hook-form/useLogin";

export const fetchUser = async () => apiRequest<undefined, UserType>("get", apiRoutes.FETCH_USER);

export const signout = async () => apiRequest<undefined, void>("post", apiRoutes.SIGNOUT);

export const login = async (data: LoginUserFields) =>
	apiRequest<LoginUserFields, UserType>("post", apiRoutes.LOGIN, data);

export const register = async (data: RegisterUserFields) =>
	apiRequest<RegisterUserFields, void>("post", apiRoutes.SIGNUP, data);

export const uploadAvatar = async (formData: FormData, id: string) =>
	apiRequest<FormData, void>("post", `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`, formData);

export const refreshTokens = async () => apiRequest<undefined, UserType>("get", apiRoutes.REFRESH_TOKENS);
