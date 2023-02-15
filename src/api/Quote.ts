import {apiRoutes} from "constants/apiConstants";
import {CreateUpdateQuoteFields} from "hooks/react-hook-form/useCreateUpdateQuote";
import {QuoteType} from "models/quote";

import {apiRequest} from "./Api";

export const fetchQuotes = async (pageNumber: number) =>
	apiRequest<undefined, QuoteType[]>("get", `${apiRoutes.QUOTES_PREFIX}?page=${pageNumber}`);
export const fetchQuotesSortedScore = async (pageNumber: number) =>
	apiRequest<undefined, QuoteType[]>("get", `${apiRoutes.QUOTES_PREFIX}/sorted_score/?page=${pageNumber}`);
export const fetchQuotesSortedRecent = async (pageNumber: number) =>
	apiRequest<undefined, QuoteType[]>("get", `${apiRoutes.QUOTES_PREFIX}/sorted_recent/?page=${pageNumber}`);

export const createQuote = async (data: CreateUpdateQuoteFields) =>
	apiRequest<CreateUpdateQuoteFields, QuoteType>("post", `${apiRoutes.QUOTES_PREFIX}`, data);

export const updateQuote = async (data: CreateUpdateQuoteFields, id: string) =>
	apiRequest<CreateUpdateQuoteFields, QuoteType>("patch", `${apiRoutes.QUOTES_PREFIX}/${id}`, data);

export const deleteQuote = async (id: string) =>
	apiRequest<string, QuoteType>("delete", `${apiRoutes.QUOTES_PREFIX}/${id}`);
export const upvoteQuote = async (id: string) =>
	apiRequest<string, QuoteType>("post", `${apiRoutes.QUOTES_PREFIX}/${id}/upvote`);
export const downvoteQuote = async (id: string) =>
	apiRequest<string, QuoteType>("post", `${apiRoutes.QUOTES_PREFIX}/${id}/downvote`);
