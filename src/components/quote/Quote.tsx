import {FC, useState} from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import {QuoteType} from "models/quote";
import Button from "react-bootstrap/Button";
import {userStorage} from "../../utils/localStorage";
import * as API from "api/Api";
import UpdateQuoteForm from "./UpdateQuoteForm";
import DeleteQuoteConfirmation from "./DeleteQuoteConfirmation";

interface Props {
	quoteValues: QuoteType;
}

const Quote: FC<Props> = ({quoteValues}) => {
	const [apiError, setApiError] = useState("");
	const [showError, setShowError] = useState(false);
	const [shownEdit, setShownEdit] = useState(false);
	const [shownDelete, setShownDelete] = useState(false);

	return (
		<>
			<div className="quote border border-primary rounded-2 d-flex">
				<div className="votes p-2 m-2 text-center">
					<Button
						className="btn-vote"
						size="sm"
						onClick={() => {
							API.upvoteQuote(quoteValues.id).then((r) => window.location.reload());
						}}
					>
						^
					</Button>
					<p className="m-0 p-0">{quoteValues.score}</p>
					<Button
						className="btn-vote"
						size="sm"
						onClick={() => {
							API.downvoteQuote(quoteValues.id).then((r) => window.location.reload());
						}}
					>
						v
					</Button>
				</div>
				<div>
					<div>
						<p>{quoteValues.content}</p>
					</div>
					<div className="author d-flex">
						<img
							className="avatar rounded-circle"
							src={`${process.env.REACT_APP_API_URL}/files/${quoteValues.author?.avatar}`}
							width={30}
						/>
						<p className="m-1">{quoteValues.author?.first_name + " " + quoteValues.author?.last_name}</p>
					</div>
				</div>
				{quoteValues.author.id === userStorage.getUser().id ? (
					<div className="quote_buttons p-2">
						<Button
							className="btn-edit bi bi-gear d-block"
							size="sm"
							onClick={() => {
								setShownEdit(true);
							}}
						/>
						<Button
							className="btn-delete bi bi-x d-block"
							size="sm"
							onClick={() => {
								setShownDelete(true);
							}}
						/>
					</div>
				) : (
					<></>
				)}

				<UpdateQuoteForm shown={shownEdit} defaultValues={quoteValues} />
				<DeleteQuoteConfirmation shown={shownDelete} defaultValues={quoteValues} />
			</div>

			{
				// <Link
				// 	className={
				// 		isMobile
				// 			? "btn btn-warning btn-sm me-2 mb-2"
				// 			: "btn btn-warning btn-sm me-2"
				// 	}
				// 	state={{				// 	to={`${routes.DASHBOARD_PREFIX}/products/edit`}
				// 		...item,
				// 	}}
				// >
				// 	Edit
				// </Link>
				// <Button
				// className={isMobile ? "btn-danger mb-2" : "btn-danger"}
				// size="sm"
				// onClick={() => handleDelete(item.id)}
				// >
				// Delete
				// </Button>
			}

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
export default Quote;
