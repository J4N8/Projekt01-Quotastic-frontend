import {makeAutoObservable} from "mobx";
import {UserType} from "models/user";
import {userStorage} from "utils/localStorage";
class AuthStore {
	user?: UserType | null = userStorage.getUser() || null;

	constructor() {
		makeAutoObservable(this);
	}

	login(user: UserType) {
		userStorage.setUser(user);
		this.user = user;
	}

	signout() {
		userStorage.clearUser();
		this.user = undefined;
	}
}

const authStore = new AuthStore();
export default authStore;
