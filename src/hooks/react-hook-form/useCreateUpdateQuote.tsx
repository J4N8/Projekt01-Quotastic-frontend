import {yupResolver} from "@hookform/resolvers/yup";
import {QuoteType} from "models/quote";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {userStorage} from "../../utils/localStorage";
import {UserType} from "../../models/auth";

export interface CreateUpdateQuoteFields {
	content: string;
	user_id?: string;
}

interface Props {
	defaultValues?: QuoteType;
}

export const useCreateUpdateQuoteForm = ({defaultValues}: Props) => {
	const CreateUpdateQuoteSchema = Yup.object().shape({
		content: Yup.string().required("Content is required"),
	});

	const {
		handleSubmit,
		formState: {errors},
		control,
	} = useForm({
		defaultValues: {
			content: "",
			author: userStorage.getUser(),
			...defaultValues,
		},
		mode: "onSubmit",
		resolver: yupResolver(CreateUpdateQuoteSchema),
	});

	return {
		handleSubmit,
		errors,
		control,
	};
};

export type CreateUpdateQuoteForm = ReturnType<typeof useCreateUpdateQuoteForm>;
