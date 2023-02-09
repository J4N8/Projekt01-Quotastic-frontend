import {apiRoutes} from "constants/apiConstants";
import {CreateUpdateQuoteFields} from "hooks/react-hook-form/useCreateUpdateQuote";
import {QuoteType} from "models/quote";

import {apiRequest} from "./Api";

export const fetchQuotes = async (pageNumber: number) =>
	apiRequest<undefined, QuoteType[]>("get", `${apiRoutes.QUOTES_PREFIX}?page=${pageNumber}`);

export const createQuote = async (data: CreateUpdateQuoteFields) =>
	apiRequest<CreateUpdateQuoteFields, QuoteType>("post", `/me/myquote`, data);

export const updateQuote = async (data: CreateUpdateQuoteFields, id: string) =>
	apiRequest<CreateUpdateQuoteFields, QuoteType>("patch", `${apiRoutes.QUOTES_PREFIX}/${id}`, data);

export const deleteQuote = async (id: string) => apiRequest<string, QuoteType>("delete", `me/myquote/${id}`);
export const upvoteQuote = async (id: string) => apiRequest<string, QuoteType>("post", `quotes/${id}/upvote`);
export const downvoteQuote = async (id: string) => apiRequest<string, QuoteType>("post", `quotes/${id}/downvote`);
