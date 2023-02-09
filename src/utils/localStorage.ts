import {UserType} from "models/user";
import {QuoteType} from "../models/quote";

const user_prefix = "user";

const userStorage = {
	getUser: (): UserType => {
		if (typeof window === "undefined") return {} as UserType;
		return JSON.parse(window.localStorage.getItem(`${user_prefix}`) as string) as UserType;
	},
	setUser: (user: UserType): void => {
		window.localStorage.setItem(`${user_prefix}`, JSON.stringify(user));
	},
	clearUser: (): void => {
		window.localStorage.removeItem(`${user_prefix}`);
	},
};

export {userStorage};

const quoteStorage = {
	getQuote: (): QuoteType => {
		if (typeof window === "undefined") return {} as QuoteType;
		return JSON.parse(window.localStorage.getItem(`quote`) as string) as QuoteType;
	},
	setQuote: (quote: QuoteType): void => {
		window.localStorage.setItem(`quote`, JSON.stringify(quote));
	},
	clearQuote: (): void => {
		window.localStorage.removeItem(`quote`);
	},
};

export {quoteStorage};
