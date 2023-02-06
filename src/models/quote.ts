import {UserType} from "./auth";

export type QuoteType = {
	id: string;
	content: string;
	score: number;
	author: UserType;
};
