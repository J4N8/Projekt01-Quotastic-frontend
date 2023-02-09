import {UserType} from "./user";

export type QuoteType = {
	id: string;
	content: string;
	score: number;
	author: UserType;
};
