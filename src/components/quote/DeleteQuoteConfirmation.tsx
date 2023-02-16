import {useCreateUpdateQuoteForm} from "hooks/react-hook-form/useCreateUpdateQuote";
import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import {Form, Modal} from "react-bootstrap";
import {routes} from "constants/routesConstants";
import * as API from "api/Api";
import {StatusCode} from "constants/errorConstants";
import {QuoteType} from "models/quote";
import Button from "react-bootstrap/Button";

interface Props {
	defaultValues: QuoteType;
	shown: boolean;
}

const DeleteQuoteConfirmation: FC<Props> = ({defaultValues, shown}) => {
	const navigate = useNavigate();
	const {handleSubmit} = useCreateUpdateQuoteForm({
		defaultValues,
	});
	const [apiError, setApiError] = useState("");
	const [showError, setShowError] = useState(false);

	const onSubmit = handleSubmit(async () => {
		await handleDelete(defaultValues);
		window.location.reload();
	});

	const handleDelete = async (data: QuoteType) => {
		const response = await API.deleteQuote(data.id);
		if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
			setApiError(response.data.message);
			setShowError(true);
		} else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
			setApiError(response.data.message);
			setShowError(true);
		} else {
			navigate(`${routes.HOME}/quotes`);
		}
	};

	return (
		<>
			<Modal show={shown} onHide={() => (shown = false)}>
				<div className="m-4">
					<h2>Are you sure?</h2>
					<p>This quote will be deleted. There is no undo of this action.</p>
					<Form className="quote-form" onSubmit={onSubmit}>
						<Button className="px-4 component-orange rounded-4" type="submit">
							Delete
						</Button>
						<Button
							className="px-4 mx-4 btn-none rounded-4"
							type="button"
							onClick={() => {
								window.location.reload();
							}}
						>
							Cancel
						</Button>
					</Form>
				</div>
			</Modal>
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
export default DeleteQuoteConfirmation;
