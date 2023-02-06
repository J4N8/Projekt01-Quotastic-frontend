import {CreateUpdateQuoteFields, useCreateUpdateQuoteForm} from "hooks/react-hook-form/useCreateUpdateQuote";
import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import {Form} from "react-bootstrap";
import {Controller} from "react-hook-form";
import FormLabel from "react-bootstrap/FormLabel";
import {routes} from "constants/routesConstants";
import * as API from "api/Api";
import {StatusCode} from "constants/errorConstants";
import {QuoteType} from "models/quote";

interface Props {
	defaultValues?: QuoteType;
}

const CreateUpdateQuoteForm: FC<Props> = ({defaultValues}) => {
	const navigate = useNavigate();
	const {handleSubmit, errors, control} = useCreateUpdateQuoteForm({
		defaultValues,
	});
	const [apiError, setApiError] = useState("");
	const [showError, setShowError] = useState(false);

	const onSubmit = handleSubmit(async (data: CreateUpdateQuoteFields) => {
		if (!defaultValues) await handleAdd(data);
		else await handleUpdate(data);
	});

	const handleAdd = async (data: CreateUpdateQuoteFields) => {
		const response = await API.createQuote(data);
		if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
			setApiError(response.data.message);
			setShowError(true);
		} else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
			setApiError(response.data.message);
			setShowError(true);
		} else {
			navigate(`${routes.DASHBOARD_PREFIX}/quotes`);
		}
	};

	const handleUpdate = async (data: CreateUpdateQuoteFields) => {
		const response = await API.updateQuote(data, defaultValues?.id as string);
		if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
			setApiError(response.data.message);
			setShowError(true);
		} else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
			setApiError(response.data.message);
			setShowError(true);
		} else {
			navigate(`${routes.DASHBOARD_PREFIX}/quotes`);
		}
	};

	return (
		<>
			<Form className="product-form" onSubmit={onSubmit}>
				<Controller
					control={control}
					name="content"
					render={({field}) => (
						<Form.Group className="mb-3">
							<FormLabel htmlFor="content">Title</FormLabel>
							<input
								{...field}
								type="text"
								aria-label="Content"
								aria-describedby="content"
								className={errors.content ? "form-control is-invalid" : "form-control"}
							/>
							{errors.content && (
								<div className="invalid-feedback text-danger">{errors.content.message}</div>
							)}
						</Form.Group>
					)}
				/>
			</Form>
			{showError && (
				<ToastContainer className="p-3" position="top-end">
					<Toast onClose={() => setShowError(false)} show={showError}>
						<Toast.Header>
							<strong className="me-suto text-danger">Error</strong>
						</Toast.Header>
						<Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
					</Toast>
				</ToastContainer>
			)}
		</>
	);
};
export default CreateUpdateQuoteForm;
